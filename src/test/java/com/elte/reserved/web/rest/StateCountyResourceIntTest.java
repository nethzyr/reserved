package com.elte.reserved.web.rest;

import com.elte.reserved.ReservedApp;

import com.elte.reserved.domain.StateCounty;
import com.elte.reserved.domain.Country;
import com.elte.reserved.repository.StateCountyRepository;
import com.elte.reserved.repository.search.StateCountySearchRepository;
import com.elte.reserved.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.elte.reserved.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StateCountyResource REST controller.
 *
 * @see StateCountyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReservedApp.class)
public class StateCountyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private StateCountyRepository stateCountyRepository;

    @Autowired
    private StateCountySearchRepository stateCountySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStateCountyMockMvc;

    private StateCounty stateCounty;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StateCountyResource stateCountyResource = new StateCountyResource(stateCountyRepository, stateCountySearchRepository);
        this.restStateCountyMockMvc = MockMvcBuilders.standaloneSetup(stateCountyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StateCounty createEntity(EntityManager em) {
        StateCounty stateCounty = new StateCounty()
            .name(DEFAULT_NAME);
        // Add required entity
        Country country = CountryResourceIntTest.createEntity(em);
        em.persist(country);
        em.flush();
        stateCounty.setCountry(country);
        return stateCounty;
    }

    @Before
    public void initTest() {
        stateCountySearchRepository.deleteAll();
        stateCounty = createEntity(em);
    }

    @Test
    @Transactional
    public void createStateCounty() throws Exception {
        int databaseSizeBeforeCreate = stateCountyRepository.findAll().size();

        // Create the StateCounty
        restStateCountyMockMvc.perform(post("/api/state-counties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stateCounty)))
            .andExpect(status().isCreated());

        // Validate the StateCounty in the database
        List<StateCounty> stateCountyList = stateCountyRepository.findAll();
        assertThat(stateCountyList).hasSize(databaseSizeBeforeCreate + 1);
        StateCounty testStateCounty = stateCountyList.get(stateCountyList.size() - 1);
        assertThat(testStateCounty.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the StateCounty in Elasticsearch
        StateCounty stateCountyEs = stateCountySearchRepository.findOne(testStateCounty.getId());
        assertThat(stateCountyEs).isEqualToIgnoringGivenFields(testStateCounty);
    }

    @Test
    @Transactional
    public void createStateCountyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stateCountyRepository.findAll().size();

        // Create the StateCounty with an existing ID
        stateCounty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStateCountyMockMvc.perform(post("/api/state-counties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stateCounty)))
            .andExpect(status().isBadRequest());

        // Validate the StateCounty in the database
        List<StateCounty> stateCountyList = stateCountyRepository.findAll();
        assertThat(stateCountyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = stateCountyRepository.findAll().size();
        // set the field null
        stateCounty.setName(null);

        // Create the StateCounty, which fails.

        restStateCountyMockMvc.perform(post("/api/state-counties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stateCounty)))
            .andExpect(status().isBadRequest());

        List<StateCounty> stateCountyList = stateCountyRepository.findAll();
        assertThat(stateCountyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStateCounties() throws Exception {
        // Initialize the database
        stateCountyRepository.saveAndFlush(stateCounty);

        // Get all the stateCountyList
        restStateCountyMockMvc.perform(get("/api/state-counties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stateCounty.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getStateCounty() throws Exception {
        // Initialize the database
        stateCountyRepository.saveAndFlush(stateCounty);

        // Get the stateCounty
        restStateCountyMockMvc.perform(get("/api/state-counties/{id}", stateCounty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stateCounty.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStateCounty() throws Exception {
        // Get the stateCounty
        restStateCountyMockMvc.perform(get("/api/state-counties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStateCounty() throws Exception {
        // Initialize the database
        stateCountyRepository.saveAndFlush(stateCounty);
        stateCountySearchRepository.save(stateCounty);
        int databaseSizeBeforeUpdate = stateCountyRepository.findAll().size();

        // Update the stateCounty
        StateCounty updatedStateCounty = stateCountyRepository.findOne(stateCounty.getId());
        // Disconnect from session so that the updates on updatedStateCounty are not directly saved in db
        em.detach(updatedStateCounty);
        updatedStateCounty
            .name(UPDATED_NAME);

        restStateCountyMockMvc.perform(put("/api/state-counties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStateCounty)))
            .andExpect(status().isOk());

        // Validate the StateCounty in the database
        List<StateCounty> stateCountyList = stateCountyRepository.findAll();
        assertThat(stateCountyList).hasSize(databaseSizeBeforeUpdate);
        StateCounty testStateCounty = stateCountyList.get(stateCountyList.size() - 1);
        assertThat(testStateCounty.getName()).isEqualTo(UPDATED_NAME);

        // Validate the StateCounty in Elasticsearch
        StateCounty stateCountyEs = stateCountySearchRepository.findOne(testStateCounty.getId());
        assertThat(stateCountyEs).isEqualToIgnoringGivenFields(testStateCounty);
    }

    @Test
    @Transactional
    public void updateNonExistingStateCounty() throws Exception {
        int databaseSizeBeforeUpdate = stateCountyRepository.findAll().size();

        // Create the StateCounty

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStateCountyMockMvc.perform(put("/api/state-counties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stateCounty)))
            .andExpect(status().isCreated());

        // Validate the StateCounty in the database
        List<StateCounty> stateCountyList = stateCountyRepository.findAll();
        assertThat(stateCountyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStateCounty() throws Exception {
        // Initialize the database
        stateCountyRepository.saveAndFlush(stateCounty);
        stateCountySearchRepository.save(stateCounty);
        int databaseSizeBeforeDelete = stateCountyRepository.findAll().size();

        // Get the stateCounty
        restStateCountyMockMvc.perform(delete("/api/state-counties/{id}", stateCounty.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean stateCountyExistsInEs = stateCountySearchRepository.exists(stateCounty.getId());
        assertThat(stateCountyExistsInEs).isFalse();

        // Validate the database is empty
        List<StateCounty> stateCountyList = stateCountyRepository.findAll();
        assertThat(stateCountyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStateCounty() throws Exception {
        // Initialize the database
        stateCountyRepository.saveAndFlush(stateCounty);
        stateCountySearchRepository.save(stateCounty);

        // Search the stateCounty
        restStateCountyMockMvc.perform(get("/api/_search/state-counties?query=id:" + stateCounty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stateCounty.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StateCounty.class);
        StateCounty stateCounty1 = new StateCounty();
        stateCounty1.setId(1L);
        StateCounty stateCounty2 = new StateCounty();
        stateCounty2.setId(stateCounty1.getId());
        assertThat(stateCounty1).isEqualTo(stateCounty2);
        stateCounty2.setId(2L);
        assertThat(stateCounty1).isNotEqualTo(stateCounty2);
        stateCounty1.setId(null);
        assertThat(stateCounty1).isNotEqualTo(stateCounty2);
    }
}
