package com.elte.reserved.repository;

import com.elte.reserved.domain.Kitchen;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Kitchen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KitchenRepository extends JpaRepository<Kitchen, Long> {

}
