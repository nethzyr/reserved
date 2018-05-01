package com.elte.reserved.service;

import com.codahale.metrics.annotation.Timed;
import com.elte.reserved.domain.*;
import com.elte.reserved.repository.*;
import com.elte.reserved.repository.search.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ManyToMany;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

    private static final Lock reindexLock = new ReentrantLock();

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final CityRepository cityRepository;

    private final CitySearchRepository citySearchRepository;

    private final CountryRepository countryRepository;

    private final CountrySearchRepository countrySearchRepository;

    private final FoodRepository foodRepository;

    private final FoodSearchRepository foodSearchRepository;

    private final KitchenRepository kitchenRepository;

    private final KitchenSearchRepository kitchenSearchRepository;

    private final PictureRepository pictureRepository;

    private final PictureSearchRepository pictureSearchRepository;

    private final ReservationRepository reservationRepository;

    private final ReservationSearchRepository reservationSearchRepository;

    private final RestaurantRepository restaurantRepository;

    private final RestaurantSearchRepository restaurantSearchRepository;

    private final StateCountyRepository stateCountyRepository;

    private final StateCountySearchRepository stateCountySearchRepository;

    private final UserInfoRepository userInfoRepository;

    private final UserInfoSearchRepository userInfoSearchRepository;

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        CityRepository cityRepository,
        CitySearchRepository citySearchRepository,
        CountryRepository countryRepository,
        CountrySearchRepository countrySearchRepository,
        FoodRepository foodRepository,
        FoodSearchRepository foodSearchRepository,
        KitchenRepository kitchenRepository,
        KitchenSearchRepository kitchenSearchRepository,
        PictureRepository pictureRepository,
        PictureSearchRepository pictureSearchRepository,
        ReservationRepository reservationRepository,
        ReservationSearchRepository reservationSearchRepository,
        RestaurantRepository restaurantRepository,
        RestaurantSearchRepository restaurantSearchRepository,
        StateCountyRepository stateCountyRepository,
        StateCountySearchRepository stateCountySearchRepository,
        UserInfoRepository userInfoRepository,
        UserInfoSearchRepository userInfoSearchRepository,
        ElasticsearchTemplate elasticsearchTemplate) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.cityRepository = cityRepository;
        this.citySearchRepository = citySearchRepository;
        this.countryRepository = countryRepository;
        this.countrySearchRepository = countrySearchRepository;
        this.foodRepository = foodRepository;
        this.foodSearchRepository = foodSearchRepository;
        this.kitchenRepository = kitchenRepository;
        this.kitchenSearchRepository = kitchenSearchRepository;
        this.pictureRepository = pictureRepository;
        this.pictureSearchRepository = pictureSearchRepository;
        this.reservationRepository = reservationRepository;
        this.reservationSearchRepository = reservationSearchRepository;
        this.restaurantRepository = restaurantRepository;
        this.restaurantSearchRepository = restaurantSearchRepository;
        this.stateCountyRepository = stateCountyRepository;
        this.stateCountySearchRepository = stateCountySearchRepository;
        this.userInfoRepository = userInfoRepository;
        this.userInfoSearchRepository = userInfoSearchRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Async
    @Timed
    @Scheduled(cron = "0 0 3 * * ?")
    public void reindexAll() {
        if (reindexLock.tryLock()) {
            try {
                reindexForClass(City.class, cityRepository, citySearchRepository);
                reindexForClass(Country.class, countryRepository, countrySearchRepository);
                reindexForClass(Food.class, foodRepository, foodSearchRepository);
                reindexForClass(Kitchen.class, kitchenRepository, kitchenSearchRepository);
                reindexForClass(Picture.class, pictureRepository, pictureSearchRepository);
                reindexForClass(Reservation.class, reservationRepository, reservationSearchRepository);
                reindexForClass(Restaurant.class, restaurantRepository, restaurantSearchRepository);
                reindexForClass(StateCounty.class, stateCountyRepository, stateCountySearchRepository);
                reindexForClass(UserInfo.class, userInfoRepository, userInfoSearchRepository);
                reindexForClass(User.class, userRepository, userSearchRepository);

                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }

    @SuppressWarnings("unchecked")
    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (IndexAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
            List<Method> relationshipGetters = Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> field.getType().equals(Set.class))
                .filter(field -> field.getAnnotation(ManyToMany.class) != null)
                .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                .map(field -> {
                    try {
                        return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
                    } catch (IntrospectionException e) {
                        log.error("Error retrieving getter for class {}, field {}. Field will NOT be indexed",
                            entityClass.getSimpleName(), field.getName(), e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            int size = 100;
            for (int i = 0; i <= jpaRepository.count() / size; i++) {
                Pageable page = new PageRequest(i, size);
                log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
                Page<T> results = jpaRepository.findAll(page);
                results.map(result -> {
                    // if there are any relationships to load, do it now
                    relationshipGetters.forEach(method -> {
                        try {
                            // eagerly load the relationship set
                            ((Set) method.invoke(result)).size();
                        } catch (Exception ex) {
                            log.error(ex.getMessage());
                        }
                    });
                    return result;
                });
                elasticsearchRepository.save(results.getContent());
            }
        }
        log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
    }
}
