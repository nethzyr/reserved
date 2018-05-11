package com.elte.reserved.repository;

import com.elte.reserved.domain.Reservation;
import com.elte.reserved.domain.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Reservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("select reservation from Reservation reservation where reservation.user.login = ?#{principal.username}")
    Page<Reservation> findByUserIsCurrentUser(Pageable pageable);

    @Query("select reservation from Reservation reservation where reservation.user.login = ?#{principal.username}")
    List<Reservation> findByUserIsCurrentUser();

    List<Reservation> findByRestaurant(Restaurant restaurant);

    Optional<Reservation> findOneByConfirmationKey(String confirmationKey);

}
