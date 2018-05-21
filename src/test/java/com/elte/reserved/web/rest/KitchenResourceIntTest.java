package com.elte.reserved.web.rest;

import com.elte.reserved.ReservedApp;
import com.elte.reserved.domain.Kitchen;
import com.elte.reserved.repository.KitchenRepository;
import com.elte.reserved.repository.search.KitchenSearchRepository;
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
 * Test class for the KitchenResource REST controller.
 *
 * @see KitchenResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReservedApp.class)
public class KitchenResourceIntTest {

    private static final String DEFAULT_TYPE_ENG = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_ENG = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_HUN = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_HUN = "BBBBBBBBBB";

    @Autowired
    private KitchenRepository kitchenRepository;

    @Autowired
    private KitchenSearchRepository kitchenSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKitchenMockMvc;

    private Kitchen kitchen;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KitchenResource kitchenResource = new KitchenResource(kitchenRepository, kitchenSearchRepository);
        this.restKitchenMockMvc = MockMvcBuilders.standaloneSetup(kitchenResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Kitchen createEntity(EntityManager em) {
        Kitchen kitchen = new Kitchen()
            .typeEng(DEFAULT_TYPE_ENG)
            .typeHun(DEFAULT_TYPE_HUN);
        return kitchen;
    }

    @Before
    public void initTest() {
        kitchenSearchRepository.deleteAll();
        kitchen = createEntity(em);
    }

    @Test
    @Transactional
    public void createKitchen() throws Exception {
        int databaseSizeBeforeCreate = kitchenRepository.findAll().size();

        // Create the Kitchen
        restKitchenMockMvc.perform(post("/api/kitchens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchen)))
            .andExpect(status().isCreated());

        // Validate the Kitchen in the database
        List<Kitchen> kitchenList = kitchenRepository.findAll();
        assertThat(kitchenList).hasSize(databaseSizeBeforeCreate + 1);
        Kitchen testKitchen = kitchenList.get(kitchenList.size() - 1);
        assertThat(testKitchen.getTypeEng()).isEqualTo(DEFAULT_TYPE_ENG);
        assertThat(testKitchen.getTypeHun()).isEqualTo(DEFAULT_TYPE_HUN);

        // Validate the Kitchen in Elasticsearch
        Kitchen kitchenEs = kitchenSearchRepository.findOne(testKitchen.getId());
        assertThat(kitchenEs).isEqualToIgnoringGivenFields(testKitchen);
    }

    @Test
    @Transactional
    public void createKitchenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kitchenRepository.findAll().size();

        // Create the Kitchen with an existing ID
        kitchen.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKitchenMockMvc.perform(post("/api/kitchens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchen)))
            .andExpect(status().isBadRequest());

        // Validate the Kitchen in the database
        List<Kitchen> kitchenList = kitchenRepository.findAll();
        assertThat(kitchenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTypeEngIsRequired() throws Exception {
        int databaseSizeBeforeTest = kitchenRepository.findAll().size();
        // set the field null
        kitchen.setTypeEng(null);

        // Create the Kitchen, which fails.

        restKitchenMockMvc.perform(post("/api/kitchens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchen)))
            .andExpect(status().isBadRequest());

        List<Kitchen> kitchenList = kitchenRepository.findAll();
        assertThat(kitchenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeHunIsRequired() throws Exception {
        int databaseSizeBeforeTest = kitchenRepository.findAll().size();
        // set the field null
        kitchen.setTypeHun(null);

        // Create the Kitchen, which fails.

        restKitchenMockMvc.perform(post("/api/kitchens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchen)))
            .andExpect(status().isBadRequest());

        List<Kitchen> kitchenList = kitchenRepository.findAll();
        assertThat(kitchenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKitchens() throws Exception {
        // Initialize the database
        kitchenRepository.saveAndFlush(kitchen);

        // Get all the kitchenList
        restKitchenMockMvc.perform(get("/api/kitchens?sort=id,desc&isList=true"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kitchen.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeEng").value(hasItem(DEFAULT_TYPE_ENG.toString())))
            .andExpect(jsonPath("$.[*].typeHun").value(hasItem(DEFAULT_TYPE_HUN.toString())));
    }

    @Test
    @Transactional
    public void getKitchen() throws Exception {
        // Initialize the database
        kitchenRepository.saveAndFlush(kitchen);

        // Get the kitchen
        restKitchenMockMvc.perform(get("/api/kitchens/{id}", kitchen.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kitchen.getId().intValue()))
            .andExpect(jsonPath("$.typeEng").value(DEFAULT_TYPE_ENG.toString()))
            .andExpect(jsonPath("$.typeHun").value(DEFAULT_TYPE_HUN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKitchen() throws Exception {
        // Get the kitchen
        restKitchenMockMvc.perform(get("/api/kitchens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKitchen() throws Exception {
        // Initialize the database
        kitchenRepository.saveAndFlush(kitchen);
        kitchenSearchRepository.save(kitchen);
        int databaseSizeBeforeUpdate = kitchenRepository.findAll().size();

        // Update the kitchen
        Kitchen updatedKitchen = kitchenRepository.findOne(kitchen.getId());
        // Disconnect from session so that the updates on updatedKitchen are not directly saved in db
        em.detach(updatedKitchen);
        updatedKitchen
            .typeEng(UPDATED_TYPE_ENG)
            .typeHun(UPDATED_TYPE_HUN);

        restKitchenMockMvc.perform(put("/api/kitchens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKitchen)))
            .andExpect(status().isOk());

        // Validate the Kitchen in the database
        List<Kitchen> kitchenList = kitchenRepository.findAll();
        assertThat(kitchenList).hasSize(databaseSizeBeforeUpdate);
        Kitchen testKitchen = kitchenList.get(kitchenList.size() - 1);
        assertThat(testKitchen.getTypeEng()).isEqualTo(UPDATED_TYPE_ENG);
        assertThat(testKitchen.getTypeHun()).isEqualTo(UPDATED_TYPE_HUN);

        // Validate the Kitchen in Elasticsearch
        Kitchen kitchenEs = kitchenSearchRepository.findOne(testKitchen.getId());
        assertThat(kitchenEs).isEqualToIgnoringGivenFields(testKitchen);
    }

    @Test
    @Transactional
    public void updateNonExistingKitchen() throws Exception {
        int databaseSizeBeforeUpdate = kitchenRepository.findAll().size();

        // Create the Kitchen

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKitchenMockMvc.perform(put("/api/kitchens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kitchen)))
            .andExpect(status().isCreated());

        // Validate the Kitchen in the database
        List<Kitchen> kitchenList = kitchenRepository.findAll();
        assertThat(kitchenList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteKitchen() throws Exception {
        // Initialize the database
        kitchenRepository.saveAndFlush(kitchen);
        kitchenSearchRepository.save(kitchen);
        int databaseSizeBeforeDelete = kitchenRepository.findAll().size();

        // Get the kitchen
        restKitchenMockMvc.perform(delete("/api/kitchens/{id}", kitchen.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean kitchenExistsInEs = kitchenSearchRepository.exists(kitchen.getId());
        assertThat(kitchenExistsInEs).isFalse();

        // Validate the database is empty
        List<Kitchen> kitchenList = kitchenRepository.findAll();
        assertThat(kitchenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchKitchen() throws Exception {
        // Initialize the database
        kitchenRepository.saveAndFlush(kitchen);
        kitchenSearchRepository.save(kitchen);

        // Search the kitchen
        restKitchenMockMvc.perform(get("/api/_search/kitchens?query=id:" + kitchen.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kitchen.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeEng").value(hasItem(DEFAULT_TYPE_ENG.toString())))
            .andExpect(jsonPath("$.[*].typeHun").value(hasItem(DEFAULT_TYPE_HUN.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Kitchen.class);
        Kitchen kitchen1 = new Kitchen();
        kitchen1.setId(1L);
        Kitchen kitchen2 = new Kitchen();
        kitchen2.setId(kitchen1.getId());
        assertThat(kitchen1).isEqualTo(kitchen2);
        kitchen2.setId(2L);
        assertThat(kitchen1).isNotEqualTo(kitchen2);
        kitchen1.setId(null);
        assertThat(kitchen1).isNotEqualTo(kitchen2);
    }
}
