package com.elte.reserved.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.elte.reserved.domain.Reservation;
import com.elte.reserved.repository.ReservationRepository;
import com.elte.reserved.repository.UserRepository;
import com.elte.reserved.repository.search.ReservationSearchRepository;
import com.elte.reserved.service.MailService;
import com.elte.reserved.service.util.RandomUtil;
import com.elte.reserved.web.rest.errors.BadRequestAlertException;
import com.elte.reserved.web.rest.errors.InternalServerErrorException;
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

import static com.elte.reserved.security.SecurityUtils.getCurrentUserLogin;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * REST controller for managing Reservation.
 */
@RestController
@RequestMapping("/api")
public class ReservationResource {

    private static final String ENTITY_NAME = "reservation";
    private final Logger log = LoggerFactory.getLogger(ReservationResource.class);
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final MailService mailService;

    private final ReservationSearchRepository reservationSearchRepository;

    public ReservationResource(ReservationRepository reservationRepository, ReservationSearchRepository reservationSearchRepository, UserRepository userRepository, MailService mailService) {
        this.reservationRepository = reservationRepository;
        this.reservationSearchRepository = reservationSearchRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    /**
     * GET  /activate : confirm the registered reservation.
     *
     * @param key the activation key
     * @throws RuntimeException 500 (Internal Server Error) if the reservation couldn't be confirmed
     */
    @GetMapping("/reservations/confirm")
    @Timed
    public ResponseEntity<Reservation> confirmReservation(
        @RequestParam(value = "key") String key,
        @RequestParam(value = "confirm") Boolean confirm
    ) throws URISyntaxException {
        log.debug("Confirming reservation for activation key {}", key);
        Optional<Reservation> result = reservationRepository.findOneByConfirmationKey(key)
            .map(reservation -> {
                reservation.setConfirmed(confirm);
                reservation.setConfirmationKey(null);
                reservationRepository.save(reservation);
                log.debug("Confirmed reservation: {}", reservation);
                return reservation;
            });
        if (!result.isPresent()) {
            throw new InternalServerErrorException("No reservation was found for this reset key");
        }
        reservationSearchRepository.save(result.get());
        if (confirm) {
            mailService.sendReservationConfirmedEmail(result.get());
        } else {
            mailService.sendDeclinedReservationEmail(result.get());
        }
        return ResponseEntity.created(new URI("/api/reservations/confirm/" + key))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.get().getId().toString()))
            .body(result.get());
    }

    /**
     * POST  /reservations : Create a new reservation.
     *
     * @param reservation the reservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reservation, or with status 400 (Bad Request) if the reservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reservations")
    @Timed
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody Reservation reservation) throws URISyntaxException {
        log.debug("REST request to save Reservation : {}", reservation);
        if (reservation.getId() != null) {
            throw new BadRequestAlertException("A new reservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        reservation.setUser(
            userRepository.findOneByLogin(getCurrentUserLogin().get())
                .orElseThrow(() -> new InternalServerErrorException("User could not be found")));
        reservation.setConfirmationKey(RandomUtil.generateActivationKey());
        Reservation result = reservationRepository.save(reservation);
        reservationSearchRepository.save(result);
        mailService.sendCreatedReservationEmail(result);
        return ResponseEntity.created(new URI("/api/reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reservations : Updates an existing reservation.
     *
     * @param reservation the reservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reservation,
     * or with status 400 (Bad Request) if the reservation is not valid,
     * or with status 500 (Internal Server Error) if the reservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reservations")
    @Timed
    public ResponseEntity<Reservation> updateReservation(@Valid @RequestBody Reservation reservation) throws URISyntaxException {
        log.debug("REST request to update Reservation : {}", reservation);
        if (reservation.getId() == null) {
            return createReservation(reservation);
        }
        Reservation result = reservationRepository.save(reservation);
        reservationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reservations : get all the reservations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of reservations in body
     */
    @GetMapping("/reservations")
    @Timed
    public ResponseEntity<List<Reservation>> getAllReservations(Pageable pageable) {
        log.debug("REST request to get a page of Reservations");
        Page<Reservation> page = reservationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/reservations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /reservations/:id : get the "id" reservation.
     *
     * @param id the id of the reservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reservation, or with status 404 (Not Found)
     */
    @GetMapping("/reservations/{id}")
    @Timed
    public ResponseEntity<Reservation> getReservation(@PathVariable Long id) {
        log.debug("REST request to get Reservation : {}", id);
        Reservation reservation = reservationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reservation));
    }

    /**
     * DELETE  /reservations/:id : delete the "id" reservation.
     *
     * @param id the id of the reservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        log.debug("REST request to delete Reservation : {}", id);
        reservationRepository.delete(id);
        reservationSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/reservations?query=:query : search for the reservation corresponding
     * to the query.
     *
     * @param query    the query of the reservation search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/reservations")
    @Timed
    public ResponseEntity<List<Reservation>> searchReservations(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Reservations for query {}", query);
        Page<Reservation> page = reservationSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/reservations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
