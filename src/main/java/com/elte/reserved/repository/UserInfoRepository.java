package com.elte.reserved.repository;

import com.elte.reserved.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the UserInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    @Query("select distinct user_info from UserInfo user_info left join fetch user_info.preferredCities left join fetch user_info.favoriteRestaurants left join fetch user_info.favoriteKitchens left join fetch user_info.favoriteFoods")
    List<UserInfo> findAllWithEagerRelationships();

    @Query("select user_info from UserInfo user_info left join fetch user_info.preferredCities left join fetch user_info.favoriteRestaurants left join fetch user_info.favoriteKitchens left join fetch user_info.favoriteFoods where user_info.id =:id")
    UserInfo findOneWithEagerRelationships(@Param("id") Long id);

}
