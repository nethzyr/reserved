package com.elte.reserved.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elte.reserved.domain.Kitchen;

import com.elte.reserved.repository.KitchenRepository;
import com.elte.reserved.repository.search.KitchenSearchRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Kitchen.
 */
@RestController
@RequestMapping("/api")
public class KitchenResource {

    private final Logger log = LoggerFactory.getLogger(KitchenResource.class);

    private static final String ENTITY_NAME = "kitchen";

    private final KitchenRepository kitchenRepository;

    private final KitchenSearchRepository kitchenSearchRepository;

    public KitchenResource(KitchenRepository kitchenRepository, KitchenSearchRepository kitchenSearchRepository) {
        this.kitchenRepository = kitchenRepository;
        this.kitchenSearchRepository = kitchenSearchRepository;
    }

    /**
     * POST  /kitchens : Create a new kitchen.
     *
     * @param kitchen the kitchen to create
     * @return the ResponseEntity with status 201 (Created) and with body the new kitchen, or with status 400 (Bad Request) if the kitchen has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/kitchens")
    @Timed
    public ResponseEntity<Kitchen> createKitchen(@Valid @RequestBody Kitchen kitchen) throws URISyntaxException {
        log.debug("REST request to save Kitchen : {}", kitchen);
        if (kitchen.getId() != null) {
            throw new BadRequestAlertException("A new kitchen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Kitchen result = kitchenRepository.save(kitchen);
        kitchenSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/kitchens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /kitchens : Updates an existing kitchen.
     *
     * @param kitchen the kitchen to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated kitchen,
     * or with status 400 (Bad Request) if the kitchen is not valid,
     * or with status 500 (Internal Server Error) if the kitchen couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/kitchens")
    @Timed
    public ResponseEntity<Kitchen> updateKitchen(@Valid @RequestBody Kitchen kitchen) throws URISyntaxException {
        log.debug("REST request to update Kitchen : {}", kitchen);
        if (kitchen.getId() == null) {
            return createKitchen(kitchen);
        }
        Kitchen result = kitchenRepository.save(kitchen);
        kitchenSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, kitchen.getId().toString()))
            .body(result);
    }

    /**
     * GET  /kitchens : get all the kitchens.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of kitchens in body
     */
    @GetMapping("/kitchens")
    @Timed
    public ResponseEntity<List<Kitchen>> getAllKitchens(Pageable pageable) {
        log.debug("REST request to get a page of Kitchens");
        Page<Kitchen> page = kitchenRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/kitchens");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /kitchens/:id : get the "id" kitchen.
     *
     * @param id the id of the kitchen to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the kitchen, or with status 404 (Not Found)
     */
    @GetMapping("/kitchens/{id}")
    @Timed
    public ResponseEntity<Kitchen> getKitchen(@PathVariable Long id) {
        log.debug("REST request to get Kitchen : {}", id);
        Kitchen kitchen = kitchenRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(kitchen));
    }

    /**
     * DELETE  /kitchens/:id : delete the "id" kitchen.
     *
     * @param id the id of the kitchen to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/kitchens/{id}")
    @Timed
    public ResponseEntity<Void> deleteKitchen(@PathVariable Long id) {
        log.debug("REST request to delete Kitchen : {}", id);
        kitchenRepository.delete(id);
        kitchenSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/kitchens?query=:query : search for the kitchen corresponding
     * to the query.
     *
     * @param query the query of the kitchen search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/kitchens")
    @Timed
    public ResponseEntity<List<Kitchen>> searchKitchens(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Kitchens for query {}", query);
        Page<Kitchen> page = kitchenSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/kitchens");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
