package com.elte.reserved.repository;

import com.elte.reserved.domain.Reservation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Reservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("select reservation from Reservation reservation where reservation.user.login = ?#{principal.username}")
    List<Reservation> findByUserIsCurrentUser();

}
