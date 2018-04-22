package com.elte.reserved.repository.search;

import com.elte.reserved.domain.Food;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Food entity.
 */
public interface FoodSearchRepository extends ElasticsearchRepository<Food, Long> {
}
