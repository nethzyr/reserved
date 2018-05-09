package com.elte.reserved.repository;

import com.elte.reserved.domain.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Restaurant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>, JpaSpecificationExecutor<Restaurant> {

    @Query("select restaurant from Restaurant restaurant where restaurant.user.login = ?#{principal.username}")
    Page<Restaurant> findByUserIsCurrentUser(Pageable pageable);

}
