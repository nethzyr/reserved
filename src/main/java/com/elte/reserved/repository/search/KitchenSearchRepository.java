package com.elte.reserved.repository.search;

import com.elte.reserved.domain.Kitchen;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Kitchen entity.
 */
public interface KitchenSearchRepository extends ElasticsearchRepository<Kitchen, Long> {
}
