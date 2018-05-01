package com.elte.reserved.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elte.reserved.domain.Picture;
import com.elte.reserved.repository.PictureRepository;
import com.elte.reserved.repository.search.PictureSearchRepository;
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
 * REST controller for managing Picture.
 */
@RestController
@RequestMapping("/api")
public class PictureResource {

    private static final String ENTITY_NAME = "picture";
    private final Logger log = LoggerFactory.getLogger(PictureResource.class);
    private final PictureRepository pictureRepository;

    private final PictureSearchRepository pictureSearchRepository;

    public PictureResource(PictureRepository pictureRepository, PictureSearchRepository pictureSearchRepository) {
        this.pictureRepository = pictureRepository;
        this.pictureSearchRepository = pictureSearchRepository;
    }

    /**
     * POST  /pictures : Create a new picture.
     *
     * @param picture the picture to create
     * @return the ResponseEntity with status 201 (Created) and with body the new picture, or with status 400 (Bad Request) if the picture has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pictures")
    @Timed
    public ResponseEntity<Picture> createPicture(@Valid @RequestBody Picture picture) throws URISyntaxException {
        log.debug("REST request to save Picture : {}", picture);
        if (picture.getId() != null) {
            throw new BadRequestAlertException("A new picture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Picture result = pictureRepository.save(picture);
        pictureSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/pictures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pictures : Updates an existing picture.
     *
     * @param picture the picture to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated picture,
     * or with status 400 (Bad Request) if the picture is not valid,
     * or with status 500 (Internal Server Error) if the picture couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pictures")
    @Timed
    public ResponseEntity<Picture> updatePicture(@Valid @RequestBody Picture picture) throws URISyntaxException {
        log.debug("REST request to update Picture : {}", picture);
        if (picture.getId() == null) {
            return createPicture(picture);
        }
        Picture result = pictureRepository.save(picture);
        pictureSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, picture.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pictures : get all the pictures.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pictures in body
     */
    @GetMapping("/pictures")
    @Timed
    public ResponseEntity<List<Picture>> getAllPictures(Pageable pageable) {
        log.debug("REST request to get a page of Pictures");
        Page<Picture> page = pictureRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pictures");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pictures/:id : get the "id" picture.
     *
     * @param id the id of the picture to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the picture, or with status 404 (Not Found)
     */
    @GetMapping("/pictures/{id}")
    @Timed
    public ResponseEntity<Picture> getPicture(@PathVariable Long id) {
        log.debug("REST request to get Picture : {}", id);
        Picture picture = pictureRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(picture));
    }

    /**
     * DELETE  /pictures/:id : delete the "id" picture.
     *
     * @param id the id of the picture to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pictures/{id}")
    @Timed
    public ResponseEntity<Void> deletePicture(@PathVariable Long id) {
        log.debug("REST request to delete Picture : {}", id);
        pictureRepository.delete(id);
        pictureSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pictures?query=:query : search for the picture corresponding
     * to the query.
     *
     * @param query    the query of the picture search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/pictures")
    @Timed
    public ResponseEntity<List<Picture>> searchPictures(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Pictures for query {}", query);
        Page<Picture> page = pictureSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/pictures");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
