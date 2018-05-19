package com.elte.reserved.repository;

import com.elte.reserved.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Modifying
    void deleteByRestaurantId(Long id);

    List<Comment> findAllByRestaurantId(Long id);
}
