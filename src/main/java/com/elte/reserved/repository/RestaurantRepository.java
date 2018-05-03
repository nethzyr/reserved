package com.elte.reserved.repository;

import com.elte.reserved.domain.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Restaurant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("select restaurant from Restaurant restaurant where restaurant.user.login = ?#{principal.username}")
    Page<Restaurant> findByUserIsCurrentUser(Pageable pageable);

    @Query(value = "select restaurant from Restaurant restaurant left join fetch restaurant.kitchens left join fetch restaurant.foods",
        countQuery = "select count(restaurant) from Restaurant restaurant left join restaurant.kitchens left join restaurant.foods")
    Page<Restaurant> findAllWithEagerRelationships(Pageable pageable);

    @Query("select restaurant from Restaurant restaurant left join fetch restaurant.kitchens left join fetch restaurant.foods where restaurant.id =:id")
    Restaurant findOneWithEagerRelationships(@Param("id") Long id);

}
