package com.elte.reserved.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elte.reserved.domain.Restaurant;
import com.elte.reserved.repository.RestaurantRepository;
import com.elte.reserved.repository.search.RestaurantSearchRepository;
import com.elte.reserved.security.SecurityUtils;
import com.elte.reserved.web.rest.errors.BadRequestAlertException;
import com.elte.reserved.web.rest.util.HeaderUtil;
import com.elte.reserved.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import static com.elte.reserved.security.AuthoritiesConstants.ADMIN;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * REST controller for managing Restaurant.
 */
@RestController
@RequestMapping("/api")
public class RestaurantResource {

    private final Logger log = LoggerFactory.getLogger(RestaurantResource.class);

    private static final String ENTITY_NAME = "restaurant";

    private final RestaurantRepository restaurantRepository;

    private final RestaurantSearchRepository restaurantSearchRepository;

    public RestaurantResource(RestaurantRepository restaurantRepository, RestaurantSearchRepository restaurantSearchRepository) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantSearchRepository = restaurantSearchRepository;
    }

    /**
     * POST  /restaurants : Create a new restaurant.
     *
     * @param restaurant the restaurant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new restaurant, or with status 400 (Bad Request) if the restaurant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/restaurants")
    @Timed
    public ResponseEntity<Restaurant> createRestaurant(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.debug("REST request to save Restaurant : {}", restaurant);
        if (restaurant.getId() != null) {
            throw new BadRequestAlertException("A new restaurant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Restaurant result = restaurantRepository.save(restaurant);
        restaurantSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/restaurants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /restaurants : Updates an existing restaurant.
     *
     * @param restaurant the restaurant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated restaurant,
     * or with status 400 (Bad Request) if the restaurant is not valid,
     * or with status 500 (Internal Server Error) if the restaurant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/restaurants")
    @Timed
    public ResponseEntity<Restaurant> updateRestaurant(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.debug("REST request to update Restaurant : {}", restaurant);
        if (restaurant.getId() == null) {
            return createRestaurant(restaurant);
        }
        Restaurant result = restaurantRepository.save(restaurant);
        restaurantSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, restaurant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /restaurants : get all the restaurants.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of restaurants in body
     */
    @GetMapping("/restaurants")
    @Timed
    public ResponseEntity<List<Restaurant>> getAllRestaurants(Pageable pageable) {
        if (SecurityUtils.isCurrentUserInRole(ADMIN)) {
            log.debug("REST request to get a page of Restaurants");
            Page<Restaurant> page = restaurantRepository.findAllWithEagerRelationships(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/restaurants");
            return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        } else {
            log.debug("REST request to get a page of Restaurants");
            Page<Restaurant> page = restaurantRepository.findByUserIsCurrentUser(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/restaurants");
            return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        }
    }

    /**
     * GET  /restaurants/:id : get the "id" restaurant.
     *
     * @param id the id of the restaurant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the restaurant, or with status 404 (Not Found)
     */
    @GetMapping("/restaurants/{id}")
    @Timed
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable Long id) {
        log.debug("REST request to get Restaurant : {}", id);
        Restaurant restaurant = restaurantRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(restaurant));
    }

    /**
     * DELETE  /restaurants/:id : delete the "id" restaurant.
     *
     * @param id the id of the restaurant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/restaurants/{id}")
    @Timed
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        log.debug("REST request to delete Restaurant : {}", id);
        Restaurant restaurant = restaurantRepository.findOneWithEagerRelationships(id);
        if (restaurant.getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get()) || SecurityUtils.isCurrentUserInRole(ADMIN)) {
            restaurantRepository.delete(id);
            restaurantSearchRepository.delete(id);
            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        }
    }

    /**
     * SEARCH  /_search/restaurants?query=:query : search for the restaurant corresponding
     * to the query.
     *
     * @param query the query of the restaurant search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/restaurants")
    @Timed
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Restaurants for query {}", query);
        Page<Restaurant> page = restaurantSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/restaurants");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
