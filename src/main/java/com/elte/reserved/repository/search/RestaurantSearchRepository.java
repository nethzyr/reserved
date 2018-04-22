package com.elte.reserved.repository.search;

import com.elte.reserved.domain.Restaurant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Restaurant entity.
 */
public interface RestaurantSearchRepository extends ElasticsearchRepository<Restaurant, Long> {
}
