package com.elte.reserved.repository.search;

import com.elte.reserved.domain.StateCounty;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StateCounty entity.
 */
public interface StateCountySearchRepository extends ElasticsearchRepository<StateCounty, Long> {
}
