package com.elte.reserved.service;


import com.elte.reserved.domain.*;
import com.elte.reserved.repository.RestaurantRepository;
import com.elte.reserved.repository.search.RestaurantSearchRepository;
import com.elte.reserved.service.dto.RestaurantCriteria;
import io.github.jhipster.service.QueryService;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.LongFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;


/**
 * Service for executing complex queries for Restaurant entities in the database.
 * The main input is a {@link RestaurantCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Restaurant} or a {@link Page} of {@link Restaurant} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class RestaurantQueryService extends QueryService<Restaurant> {

    private final Logger log = LoggerFactory.getLogger(RestaurantQueryService.class);


    private final RestaurantRepository restaurantRepository;

    private final RestaurantSearchRepository restaurantSearchRepository;

    public RestaurantQueryService(RestaurantRepository restaurantRepository, RestaurantSearchRepository restaurantSearchRepository) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantSearchRepository = restaurantSearchRepository;
    }

    /**
     * Return a {@link List} of {@link Restaurant} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Restaurant> findByCriteria(RestaurantCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Restaurant> specification = createSpecification(criteria);
        return restaurantRepository.findAll(specification);
    }


    /**
     * Get all filtered restaurants.
     *
     * @param cityArray String list of cities to filter
     * @param kitchenArray String list of kitchens to filter
     * @param foodArray String list of foods to filter
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Restaurant> findMultiFilter(List<String> cityArray, List<String> kitchenArray, List<String> foodArray, Pageable pageable) {
        RestaurantCriteria criteria = new RestaurantCriteria();
        criteria.setVisible((BooleanFilter) new BooleanFilter().setEquals(true));
        List<Restaurant> cityList = new ArrayList<>();
        Set<Restaurant> kitchenList = new LinkedHashSet<>();
        Set<Restaurant> foodList = new LinkedHashSet<>();

        for (String i : cityArray) {
            criteria.setCityId((LongFilter) new LongFilter()
                .setEquals(Long.parseLong(i)));
            cityList.addAll(findByCriteria(criteria));
        }
        criteria = new RestaurantCriteria();
        criteria.setVisible((BooleanFilter) new BooleanFilter().setEquals(true));
        for (String i : kitchenArray) {
            criteria.setKitchenId((LongFilter) new LongFilter()
                .setEquals(Long.parseLong(i)));
            kitchenList.addAll(findByCriteria(criteria));
        }
        if (!kitchenArray.isEmpty()) {
            if (!cityArray.isEmpty()) {
                cityList.retainAll(kitchenList);
            } else {
                cityList.addAll(new LinkedHashSet<>(kitchenList));
            }
        }
        criteria = new RestaurantCriteria();
        criteria.setVisible((BooleanFilter) new BooleanFilter().setEquals(true));
        for (String i : foodArray) {
            criteria.setFoodId((LongFilter) new LongFilter()
                .setEquals(Long.parseLong(i)));
            foodList.addAll(findByCriteria(criteria));
        }
        if (!foodArray.isEmpty()) {
            if (!cityArray.isEmpty() || !kitchenArray.isEmpty()) {
                cityList.retainAll(foodList);
            } else {
                cityList.addAll(new LinkedHashSet<>(foodList));
            }
        }

        cityList.sort((lhs, rhs) -> {
            if (lhs.getRating().equals(rhs.getRating())) {
                return lhs.getName().compareTo(rhs.getName());
            } else {
                return rhs.getRating().compareTo(lhs.getRating());
            }
        });

        log.debug("Request to get all filtered Restaurants: {}", pageable);
        int start = pageable.getOffset();
        int end = (start + pageable.getPageSize()) > cityList.size() ? cityList.size() : (start + pageable.getPageSize());
        return new PageImpl<>(cityList.subList(start, end), pageable, cityList.size());
    }

    /**
     * Return a {@link Page} of {@link Restaurant} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Restaurant> findByCriteria(RestaurantCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Restaurant> specification = createSpecification(criteria);
        return restaurantRepository.findAll(specification, page);
    }

    /**
     * Function to convert RestaurantCriteria to a {@link Specifications}
     */
    private Specifications<Restaurant> createSpecification(RestaurantCriteria criteria) {
        Specifications<Restaurant> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Restaurant_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Restaurant_.name));
            }
            if (criteria.getStreetAddress() != null) {
                specification = specification.and(buildStringSpecification(criteria.getStreetAddress(), Restaurant_.streetAddress));
            }
            if (criteria.getPostalCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPostalCode(), Restaurant_.postalCode));
            }
            if (criteria.getInfoEng() != null) {
                specification = specification.and(buildStringSpecification(criteria.getInfoEng(), Restaurant_.infoEng));
            }
            if (criteria.getInfoHun() != null) {
                specification = specification.and(buildStringSpecification(criteria.getInfoHun(), Restaurant_.infoHun));
            }
            if (criteria.getEmail() != null) {
                specification = specification.and(buildStringSpecification(criteria.getEmail(), Restaurant_.email));
            }
            if (criteria.getPhone() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPhone(), Restaurant_.phone));
            }
            if (criteria.getWebsite() != null) {
                specification = specification.and(buildStringSpecification(criteria.getWebsite(), Restaurant_.website));
            }
            if (criteria.getFacebook() != null) {
                specification = specification.and(buildStringSpecification(criteria.getFacebook(), Restaurant_.facebook));
            }
            if (criteria.getGooglePlaceId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getGooglePlaceId(), Restaurant_.googlePlaceId));
            }
            if (criteria.getRating() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRating(), Restaurant_.rating));
            }
            if (criteria.getLat() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLat(), Restaurant_.lat));
            }
            if (criteria.getLng() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLng(), Restaurant_.lng));
            }
            if (criteria.getVisible() != null) {
                specification = specification.and(buildSpecification(criteria.getVisible(), Restaurant_.visible));
            }
            if (criteria.getCommentId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCommentId(), Restaurant_.comments, Comment_.id));
            }
            if (criteria.getCityId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCityId(), Restaurant_.city, City_.id));
            }
            if (criteria.getUserId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getUserId(), Restaurant_.user, User_.id));
            }
            if (criteria.getPictureId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getPictureId(), Restaurant_.picture, Picture_.id));
            }
            if (criteria.getKitchenId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getKitchenId(), Restaurant_.kitchens, Kitchen_.id));
            }
            if (criteria.getFoodId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getFoodId(), Restaurant_.foods, Food_.id));
            }
        }
        return specification;
    }

}
