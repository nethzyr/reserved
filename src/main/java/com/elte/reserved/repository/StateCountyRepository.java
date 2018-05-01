package com.elte.reserved.repository;

import com.elte.reserved.domain.StateCounty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the StateCounty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StateCountyRepository extends JpaRepository<StateCounty, Long> {

}
