package com.elte.reserved.repository;

import com.elte.reserved.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Restaurant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("select restaurant from Restaurant restaurant where restaurant.user.login = ?#{principal.username}")
    List<Restaurant> findByUserIsCurrentUser();
    @Query("select distinct restaurant from Restaurant restaurant left join fetch restaurant.kitchens left join fetch restaurant.foods")
    List<Restaurant> findAllWithEagerRelationships();

    @Query("select restaurant from Restaurant restaurant left join fetch restaurant.kitchens left join fetch restaurant.foods where restaurant.id =:id")
    Restaurant findOneWithEagerRelationships(@Param("id") Long id);

}
