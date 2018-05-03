package com.elte.reserved.repository;

import com.elte.reserved.domain.UserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    @Query(value = "select distinct user_info from UserInfo user_info left join fetch user_info.preferredCities left join fetch user_info.favoriteRestaurants left join fetch user_info.favoriteKitchens left join fetch user_info.favoriteFoods",
        countQuery = "select distinct user_info from UserInfo user_info left join user_info.preferredCities left join user_info.favoriteRestaurants left join user_info.favoriteKitchens left join user_info.favoriteFoods")
    Page<UserInfo> findAllWithEagerRelationships(Pageable pageable);

    @Query("select user_info from UserInfo user_info left join fetch user_info.preferredCities left join fetch user_info.favoriteRestaurants left join fetch user_info.favoriteKitchens left join fetch user_info.favoriteFoods where user_info.id =:id")
    UserInfo findOneWithEagerRelationships(@Param("id") Long id);

}
