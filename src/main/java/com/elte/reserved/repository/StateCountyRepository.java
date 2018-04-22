package com.elte.reserved.repository;

import com.elte.reserved.domain.StateCounty;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StateCounty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StateCountyRepository extends JpaRepository<StateCounty, Long> {

}
