package com.elte.reserved.repository.search;

import com.elte.reserved.domain.Comment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.Modifying;

/**
 * Spring Data Elasticsearch repository for the Comment entity.
 */
public interface CommentSearchRepository extends ElasticsearchRepository<Comment, Long> {

    @Modifying
    void deleteByRestaurantId(Long id);
}
