package com.elte.reserved.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elte.reserved.domain.StateCounty;
import com.elte.reserved.repository.StateCountyRepository;
import com.elte.reserved.repository.search.StateCountySearchRepository;
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

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * REST controller for managing StateCounty.
 */
@RestController
@RequestMapping("/api")
public class StateCountyResource {

    private static final String ENTITY_NAME = "stateCounty";
    private final Logger log = LoggerFactory.getLogger(StateCountyResource.class);
    private final StateCountyRepository stateCountyRepository;

    private final StateCountySearchRepository stateCountySearchRepository;

    public StateCountyResource(StateCountyRepository stateCountyRepository, StateCountySearchRepository stateCountySearchRepository) {
        this.stateCountyRepository = stateCountyRepository;
        this.stateCountySearchRepository = stateCountySearchRepository;
    }

    /**
     * POST  /state-counties : Create a new stateCounty.
     *
     * @param stateCounty the stateCounty to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stateCounty, or with status 400 (Bad Request) if the stateCounty has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/state-counties")
    @Timed
    public ResponseEntity<StateCounty> createStateCounty(@Valid @RequestBody StateCounty stateCounty) throws URISyntaxException {
        log.debug("REST request to save StateCounty : {}", stateCounty);
        if (stateCounty.getId() != null) {
            throw new BadRequestAlertException("A new stateCounty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StateCounty result = stateCountyRepository.save(stateCounty);
        stateCountySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/state-counties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /state-counties : Updates an existing stateCounty.
     *
     * @param stateCounty the stateCounty to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stateCounty,
     * or with status 400 (Bad Request) if the stateCounty is not valid,
     * or with status 500 (Internal Server Error) if the stateCounty couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/state-counties")
    @Timed
    public ResponseEntity<StateCounty> updateStateCounty(@Valid @RequestBody StateCounty stateCounty) throws URISyntaxException {
        log.debug("REST request to update StateCounty : {}", stateCounty);
        if (stateCounty.getId() == null) {
            return createStateCounty(stateCounty);
        }
        StateCounty result = stateCountyRepository.save(stateCounty);
        stateCountySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stateCounty.getId().toString()))
            .body(result);
    }

    /**
     * GET  /state-counties : get all the stateCounties.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stateCounties in body
     */
    @GetMapping("/state-counties")
    @Timed
    public ResponseEntity<List<StateCounty>> getAllStateCounties(Pageable pageable) {
        log.debug("REST request to get a page of StateCounties");
        Page<StateCounty> page = stateCountyRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/state-counties");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /state-counties/:id : get the "id" stateCounty.
     *
     * @param id the id of the stateCounty to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stateCounty, or with status 404 (Not Found)
     */
    @GetMapping("/state-counties/{id}")
    @Timed
    public ResponseEntity<StateCounty> getStateCounty(@PathVariable Long id) {
        log.debug("REST request to get StateCounty : {}", id);
        StateCounty stateCounty = stateCountyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stateCounty));
    }

    /**
     * DELETE  /state-counties/:id : delete the "id" stateCounty.
     *
     * @param id the id of the stateCounty to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/state-counties/{id}")
    @Timed
    public ResponseEntity<Void> deleteStateCounty(@PathVariable Long id) {
        log.debug("REST request to delete StateCounty : {}", id);
        stateCountyRepository.delete(id);
        stateCountySearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/state-counties?query=:query : search for the stateCounty corresponding
     * to the query.
     *
     * @param query    the query of the stateCounty search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/state-counties")
    @Timed
    public ResponseEntity<List<StateCounty>> searchStateCounties(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of StateCounties for query {}", query);
        Page<StateCounty> page = stateCountySearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/state-counties");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
