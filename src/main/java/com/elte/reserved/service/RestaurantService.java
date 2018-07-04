package com.elte.reserved.service;

import com.elte.reserved.domain.Restaurant;
import com.elte.reserved.repository.CommentRepository;
import com.elte.reserved.repository.RestaurantRepository;
import com.elte.reserved.repository.search.CommentSearchRepository;
import com.elte.reserved.repository.search.RestaurantSearchRepository;
import org.elasticsearch.index.query.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing Restaurant.
 */
@Service
@Transactional
public class RestaurantService {

    private final Logger log = LoggerFactory.getLogger(RestaurantService.class);

    private final RestaurantRepository restaurantRepository;

    private final RestaurantSearchRepository restaurantSearchRepository;

    private final PlacesService placesService;

    private final CommentRepository commentRepository;

    private final CommentSearchRepository commentSearchRepositoryRepository;

    private final RestaurantQueryService restaurantQueryService;

    public RestaurantService(RestaurantRepository restaurantRepository, RestaurantSearchRepository restaurantSearchRepository, PlacesService placesService, CommentRepository commentRepository, CommentSearchRepository commentSearchRepositoryRepository, RestaurantQueryService restaurantQueryService) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantSearchRepository = restaurantSearchRepository;
        this.placesService = placesService;
        this.commentRepository = commentRepository;
        this.commentSearchRepositoryRepository = commentSearchRepositoryRepository;
        this.restaurantQueryService = restaurantQueryService;
    }

    /**
     * Save a restaurant.
     *
     * @param restaurant the entity to save
     * @return the persisted entity
     */
    public Restaurant save(Restaurant restaurant) {
        log.debug("Request to save Restaurant : {}", restaurant);
        restaurant = PlacesService.details(restaurant);
        if (restaurant != null && restaurant.getComments().size() > 0) {
            commentRepository.save(restaurant.getComments());
            commentSearchRepositoryRepository.save(restaurant.getComments());
        }
        Restaurant result = restaurantRepository.save(restaurant);
        restaurantSearchRepository.save(result);
        return result;
    }

    /**
     * Update restaurant google details.
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void updateGoogleDetails() {
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        for (Restaurant restaurant : restaurantList) {
            if (restaurant.getGooglePlaceId() != null) {
                restaurant = PlacesService.details(restaurant);
                log.debug("Request to save Restaurant : {}", restaurant);
                if (restaurant != null) {
                    commentRepository.deleteByRestaurantId(restaurant.getId());
                    commentSearchRepositoryRepository.deleteByRestaurantId(restaurant.getId());
                }
                save(restaurant);
            }
        }
    }

    /**
     * Get all the restaurants.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Restaurant> findAll(Pageable pageable) {
        log.debug("Request to get all Restaurants");
        return restaurantRepository.findAll(pageable);
    }

    /**
     * Get one restaurant by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Restaurant findOne(Long id) {
        log.debug("Request to get Restaurant : {}", id);
        return restaurantRepository.findOne(id);
    }

    /**
     * Delete the restaurant by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Restaurant : {}", id);
        restaurantRepository.delete(id);
        restaurantSearchRepository.delete(id);
    }

    /**
     * Search for the restaurant corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Restaurant> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Restaurants for query {}", query);
        Page<Restaurant> result = restaurantSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }

    /**
     * Search for the restaurant corresponding to the query.
     *
     * @param query    the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Restaurant> search(QueryBuilder query, Pageable pageable) {
        log.debug("Request to search for a page of Restaurants for query {}", query);
        Page<Restaurant> result = restaurantSearchRepository.search(query, pageable);
        return result;
    }
}
