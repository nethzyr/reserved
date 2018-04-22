package com.elte.reserved.repository;

import com.elte.reserved.domain.UserInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the UserInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    @Query("select distinct user_info from UserInfo user_info left join fetch user_info.preferredCities left join fetch user_info.favoriteRestaurants")
    List<UserInfo> findAllWithEagerRelationships();

    @Query("select user_info from UserInfo user_info left join fetch user_info.preferredCities left join fetch user_info.favoriteRestaurants where user_info.id =:id")
    UserInfo findOneWithEagerRelationships(@Param("id") Long id);

}
