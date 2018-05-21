package com.elte.reserved.web.rest;

import com.elte.reserved.ReservedApp;
import com.elte.reserved.domain.*;
import com.elte.reserved.repository.RestaurantRepository;
import com.elte.reserved.repository.search.RestaurantSearchRepository;
import com.elte.reserved.service.RestaurantQueryService;
import com.elte.reserved.service.RestaurantService;
import com.elte.reserved.service.UserService;
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
 * Test class for the RestaurantResource REST controller.
 *
 * @see RestaurantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReservedApp.class)
public class RestaurantResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_INFO_ENG = "AAAAAAAAAA";
    private static final String UPDATED_INFO_ENG = "BBBBBBBBBB";

    private static final String DEFAULT_INFO_HUN = "AAAAAAAAAA";
    private static final String UPDATED_INFO_HUN = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "john.doe@jhipster.com";
    private static final String UPDATED_EMAIL = "updated@jhipster.com";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    private static final String DEFAULT_FACEBOOK = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK = "BBBBBBBBBB";

    private static final String DEFAULT_GOOGLE_PLACE_ID = "AAAAAAAAAA";
    private static final String UPDATED_GOOGLE_PLACE_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_RATING = 1;
    private static final Integer UPDATED_RATING = 2;

    private static final Double DEFAULT_LAT = 1D;
    private static final Double UPDATED_LAT = 2D;

    private static final Double DEFAULT_LNG = 1D;
    private static final Double UPDATED_LNG = 2D;

    private static final Boolean DEFAULT_VISIBLE = false;
    private static final Boolean UPDATED_VISIBLE = true;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private RestaurantSearchRepository restaurantSearchRepository;

    @Autowired
    private RestaurantQueryService restaurantQueryService;

    @Autowired
    private UserService userService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRestaurantMockMvc;

    private Restaurant restaurant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestaurantResource restaurantResource = new RestaurantResource(restaurantService, restaurantQueryService, userService);
        this.restRestaurantMockMvc = MockMvcBuilders.standaloneSetup(restaurantResource)
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
    public static Restaurant createEntity(EntityManager em) {
        Restaurant restaurant = new Restaurant()
            .name(DEFAULT_NAME)
            .streetAddress(DEFAULT_STREET_ADDRESS)
            .postalCode(DEFAULT_POSTAL_CODE)
            .infoEng(DEFAULT_INFO_ENG)
            .infoHun(DEFAULT_INFO_HUN)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE)
            .website(DEFAULT_WEBSITE)
            .facebook(DEFAULT_FACEBOOK)
            .googlePlaceId(DEFAULT_GOOGLE_PLACE_ID)
            .rating(DEFAULT_RATING)
            .lat(DEFAULT_LAT)
            .lng(DEFAULT_LNG)
            .visible(DEFAULT_VISIBLE);
        // Add required entity
        City city = CityResourceIntTest.createEntity(em);
        em.persist(city);
        em.flush();
        restaurant.setCity(city);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        restaurant.setUser(user);
        return restaurant;
    }

    @Before
    public void initTest() {
        restaurantSearchRepository.deleteAll();
        restaurant = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestaurant() throws Exception {
        int databaseSizeBeforeCreate = restaurantRepository.findAll().size();

        // Create the Restaurant
        restRestaurantMockMvc.perform(post("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isCreated());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeCreate + 1);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRestaurant.getStreetAddress()).isEqualTo(DEFAULT_STREET_ADDRESS);
        assertThat(testRestaurant.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testRestaurant.getInfoEng()).isEqualTo(DEFAULT_INFO_ENG);
        assertThat(testRestaurant.getInfoHun()).isEqualTo(DEFAULT_INFO_HUN);
        assertThat(testRestaurant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testRestaurant.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testRestaurant.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testRestaurant.getFacebook()).isEqualTo(DEFAULT_FACEBOOK);
        assertThat(testRestaurant.getGooglePlaceId()).isEqualTo(DEFAULT_GOOGLE_PLACE_ID);
        assertThat(testRestaurant.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testRestaurant.getLat()).isEqualTo(DEFAULT_LAT);
        assertThat(testRestaurant.getLng()).isEqualTo(DEFAULT_LNG);
        assertThat(testRestaurant.isVisible()).isEqualTo(DEFAULT_VISIBLE);

        // Validate the Restaurant in Elasticsearch
        Restaurant restaurantEs = restaurantSearchRepository.findOne(testRestaurant.getId());
        assertThat(restaurantEs).isEqualToIgnoringGivenFields(testRestaurant);
    }

    @Test
    @Transactional
    public void createRestaurantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restaurantRepository.findAll().size();

        // Create the Restaurant with an existing ID
        restaurant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestaurantMockMvc.perform(post("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isBadRequest());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = restaurantRepository.findAll().size();
        // set the field null
        restaurant.setName(null);

        // Create the Restaurant, which fails.

        restRestaurantMockMvc.perform(post("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isBadRequest());

        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = restaurantRepository.findAll().size();
        // set the field null
        restaurant.setEmail(null);

        // Create the Restaurant, which fails.

        restRestaurantMockMvc.perform(post("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isBadRequest());

        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRestaurants() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList
        restRestaurantMockMvc.perform(get("/api/restaurants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].infoEng").value(hasItem(DEFAULT_INFO_ENG.toString())))
            .andExpect(jsonPath("$.[*].infoHun").value(hasItem(DEFAULT_INFO_HUN.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK.toString())))
            .andExpect(jsonPath("$.[*].googlePlaceId").value(hasItem(DEFAULT_GOOGLE_PLACE_ID.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].lat").value(hasItem(DEFAULT_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].lng").value(hasItem(DEFAULT_LNG.doubleValue())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getRestaurant() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get the restaurant
        restRestaurantMockMvc.perform(get("/api/restaurants/{id}", restaurant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restaurant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.streetAddress").value(DEFAULT_STREET_ADDRESS.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.infoEng").value(DEFAULT_INFO_ENG.toString()))
            .andExpect(jsonPath("$.infoHun").value(DEFAULT_INFO_HUN.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()))
            .andExpect(jsonPath("$.facebook").value(DEFAULT_FACEBOOK.toString()))
            .andExpect(jsonPath("$.googlePlaceId").value(DEFAULT_GOOGLE_PLACE_ID.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING))
            .andExpect(jsonPath("$.lat").value(DEFAULT_LAT.doubleValue()))
            .andExpect(jsonPath("$.lng").value(DEFAULT_LNG.doubleValue()))
            .andExpect(jsonPath("$.visible").value(DEFAULT_VISIBLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getAllRestaurantsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where name equals to DEFAULT_NAME
        defaultRestaurantShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the restaurantList where name equals to UPDATED_NAME
        defaultRestaurantShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where name in DEFAULT_NAME or UPDATED_NAME
        defaultRestaurantShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the restaurantList where name equals to UPDATED_NAME
        defaultRestaurantShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where name is not null
        defaultRestaurantShouldBeFound("name.specified=true");

        // Get all the restaurantList where name is null
        defaultRestaurantShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByStreetAddressIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where streetAddress equals to DEFAULT_STREET_ADDRESS
        defaultRestaurantShouldBeFound("streetAddress.equals=" + DEFAULT_STREET_ADDRESS);

        // Get all the restaurantList where streetAddress equals to UPDATED_STREET_ADDRESS
        defaultRestaurantShouldNotBeFound("streetAddress.equals=" + UPDATED_STREET_ADDRESS);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByStreetAddressIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where streetAddress in DEFAULT_STREET_ADDRESS or UPDATED_STREET_ADDRESS
        defaultRestaurantShouldBeFound("streetAddress.in=" + DEFAULT_STREET_ADDRESS + "," + UPDATED_STREET_ADDRESS);

        // Get all the restaurantList where streetAddress equals to UPDATED_STREET_ADDRESS
        defaultRestaurantShouldNotBeFound("streetAddress.in=" + UPDATED_STREET_ADDRESS);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByStreetAddressIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where streetAddress is not null
        defaultRestaurantShouldBeFound("streetAddress.specified=true");

        // Get all the restaurantList where streetAddress is null
        defaultRestaurantShouldNotBeFound("streetAddress.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByPostalCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where postalCode equals to DEFAULT_POSTAL_CODE
        defaultRestaurantShouldBeFound("postalCode.equals=" + DEFAULT_POSTAL_CODE);

        // Get all the restaurantList where postalCode equals to UPDATED_POSTAL_CODE
        defaultRestaurantShouldNotBeFound("postalCode.equals=" + UPDATED_POSTAL_CODE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByPostalCodeIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where postalCode in DEFAULT_POSTAL_CODE or UPDATED_POSTAL_CODE
        defaultRestaurantShouldBeFound("postalCode.in=" + DEFAULT_POSTAL_CODE + "," + UPDATED_POSTAL_CODE);

        // Get all the restaurantList where postalCode equals to UPDATED_POSTAL_CODE
        defaultRestaurantShouldNotBeFound("postalCode.in=" + UPDATED_POSTAL_CODE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByPostalCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where postalCode is not null
        defaultRestaurantShouldBeFound("postalCode.specified=true");

        // Get all the restaurantList where postalCode is null
        defaultRestaurantShouldNotBeFound("postalCode.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByInfoEngIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where infoEng equals to DEFAULT_INFO_ENG
        defaultRestaurantShouldBeFound("infoEng.equals=" + DEFAULT_INFO_ENG);

        // Get all the restaurantList where infoEng equals to UPDATED_INFO_ENG
        defaultRestaurantShouldNotBeFound("infoEng.equals=" + UPDATED_INFO_ENG);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByInfoEngIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where infoEng in DEFAULT_INFO_ENG or UPDATED_INFO_ENG
        defaultRestaurantShouldBeFound("infoEng.in=" + DEFAULT_INFO_ENG + "," + UPDATED_INFO_ENG);

        // Get all the restaurantList where infoEng equals to UPDATED_INFO_ENG
        defaultRestaurantShouldNotBeFound("infoEng.in=" + UPDATED_INFO_ENG);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByInfoEngIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where infoEng is not null
        defaultRestaurantShouldBeFound("infoEng.specified=true");

        // Get all the restaurantList where infoEng is null
        defaultRestaurantShouldNotBeFound("infoEng.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByInfoHunIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where infoHun equals to DEFAULT_INFO_HUN
        defaultRestaurantShouldBeFound("infoHun.equals=" + DEFAULT_INFO_HUN);

        // Get all the restaurantList where infoHun equals to UPDATED_INFO_HUN
        defaultRestaurantShouldNotBeFound("infoHun.equals=" + UPDATED_INFO_HUN);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByInfoHunIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where infoHun in DEFAULT_INFO_HUN or UPDATED_INFO_HUN
        defaultRestaurantShouldBeFound("infoHun.in=" + DEFAULT_INFO_HUN + "," + UPDATED_INFO_HUN);

        // Get all the restaurantList where infoHun equals to UPDATED_INFO_HUN
        defaultRestaurantShouldNotBeFound("infoHun.in=" + UPDATED_INFO_HUN);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByInfoHunIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where infoHun is not null
        defaultRestaurantShouldBeFound("infoHun.specified=true");

        // Get all the restaurantList where infoHun is null
        defaultRestaurantShouldNotBeFound("infoHun.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByEmailIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where email equals to DEFAULT_EMAIL
        defaultRestaurantShouldBeFound("email.equals=" + DEFAULT_EMAIL);

        // Get all the restaurantList where email equals to UPDATED_EMAIL
        defaultRestaurantShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByEmailIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where email in DEFAULT_EMAIL or UPDATED_EMAIL
        defaultRestaurantShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

        // Get all the restaurantList where email equals to UPDATED_EMAIL
        defaultRestaurantShouldNotBeFound("email.in=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByEmailIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where email is not null
        defaultRestaurantShouldBeFound("email.specified=true");

        // Get all the restaurantList where email is null
        defaultRestaurantShouldNotBeFound("email.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByPhoneIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where phone equals to DEFAULT_PHONE
        defaultRestaurantShouldBeFound("phone.equals=" + DEFAULT_PHONE);

        // Get all the restaurantList where phone equals to UPDATED_PHONE
        defaultRestaurantShouldNotBeFound("phone.equals=" + UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByPhoneIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where phone in DEFAULT_PHONE or UPDATED_PHONE
        defaultRestaurantShouldBeFound("phone.in=" + DEFAULT_PHONE + "," + UPDATED_PHONE);

        // Get all the restaurantList where phone equals to UPDATED_PHONE
        defaultRestaurantShouldNotBeFound("phone.in=" + UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByPhoneIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where phone is not null
        defaultRestaurantShouldBeFound("phone.specified=true");

        // Get all the restaurantList where phone is null
        defaultRestaurantShouldNotBeFound("phone.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByWebsiteIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where website equals to DEFAULT_WEBSITE
        defaultRestaurantShouldBeFound("website.equals=" + DEFAULT_WEBSITE);

        // Get all the restaurantList where website equals to UPDATED_WEBSITE
        defaultRestaurantShouldNotBeFound("website.equals=" + UPDATED_WEBSITE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByWebsiteIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where website in DEFAULT_WEBSITE or UPDATED_WEBSITE
        defaultRestaurantShouldBeFound("website.in=" + DEFAULT_WEBSITE + "," + UPDATED_WEBSITE);

        // Get all the restaurantList where website equals to UPDATED_WEBSITE
        defaultRestaurantShouldNotBeFound("website.in=" + UPDATED_WEBSITE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByWebsiteIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where website is not null
        defaultRestaurantShouldBeFound("website.specified=true");

        // Get all the restaurantList where website is null
        defaultRestaurantShouldNotBeFound("website.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByFacebookIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where facebook equals to DEFAULT_FACEBOOK
        defaultRestaurantShouldBeFound("facebook.equals=" + DEFAULT_FACEBOOK);

        // Get all the restaurantList where facebook equals to UPDATED_FACEBOOK
        defaultRestaurantShouldNotBeFound("facebook.equals=" + UPDATED_FACEBOOK);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByFacebookIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where facebook in DEFAULT_FACEBOOK or UPDATED_FACEBOOK
        defaultRestaurantShouldBeFound("facebook.in=" + DEFAULT_FACEBOOK + "," + UPDATED_FACEBOOK);

        // Get all the restaurantList where facebook equals to UPDATED_FACEBOOK
        defaultRestaurantShouldNotBeFound("facebook.in=" + UPDATED_FACEBOOK);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByFacebookIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where facebook is not null
        defaultRestaurantShouldBeFound("facebook.specified=true");

        // Get all the restaurantList where facebook is null
        defaultRestaurantShouldNotBeFound("facebook.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByGooglePlaceIdIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where googlePlaceId equals to DEFAULT_GOOGLE_PLACE_ID
        defaultRestaurantShouldBeFound("googlePlaceId.equals=" + DEFAULT_GOOGLE_PLACE_ID);

        // Get all the restaurantList where googlePlaceId equals to UPDATED_GOOGLE_PLACE_ID
        defaultRestaurantShouldNotBeFound("googlePlaceId.equals=" + UPDATED_GOOGLE_PLACE_ID);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByGooglePlaceIdIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where googlePlaceId in DEFAULT_GOOGLE_PLACE_ID or UPDATED_GOOGLE_PLACE_ID
        defaultRestaurantShouldBeFound("googlePlaceId.in=" + DEFAULT_GOOGLE_PLACE_ID + "," + UPDATED_GOOGLE_PLACE_ID);

        // Get all the restaurantList where googlePlaceId equals to UPDATED_GOOGLE_PLACE_ID
        defaultRestaurantShouldNotBeFound("googlePlaceId.in=" + UPDATED_GOOGLE_PLACE_ID);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByGooglePlaceIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where googlePlaceId is not null
        defaultRestaurantShouldBeFound("googlePlaceId.specified=true");

        // Get all the restaurantList where googlePlaceId is null
        defaultRestaurantShouldNotBeFound("googlePlaceId.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByRatingIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where rating equals to DEFAULT_RATING
        defaultRestaurantShouldBeFound("rating.equals=" + DEFAULT_RATING);

        // Get all the restaurantList where rating equals to UPDATED_RATING
        defaultRestaurantShouldNotBeFound("rating.equals=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByRatingIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where rating in DEFAULT_RATING or UPDATED_RATING
        defaultRestaurantShouldBeFound("rating.in=" + DEFAULT_RATING + "," + UPDATED_RATING);

        // Get all the restaurantList where rating equals to UPDATED_RATING
        defaultRestaurantShouldNotBeFound("rating.in=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByRatingIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where rating is not null
        defaultRestaurantShouldBeFound("rating.specified=true");

        // Get all the restaurantList where rating is null
        defaultRestaurantShouldNotBeFound("rating.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByRatingIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where rating greater than or equals to DEFAULT_RATING
        defaultRestaurantShouldBeFound("rating.greaterOrEqualThan=" + DEFAULT_RATING);

        // Get all the restaurantList where rating greater than or equals to UPDATED_RATING
        defaultRestaurantShouldNotBeFound("rating.greaterOrEqualThan=" + UPDATED_RATING);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByRatingIsLessThanSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where rating less than or equals to DEFAULT_RATING
        defaultRestaurantShouldNotBeFound("rating.lessThan=" + DEFAULT_RATING);

        // Get all the restaurantList where rating less than or equals to UPDATED_RATING
        defaultRestaurantShouldBeFound("rating.lessThan=" + UPDATED_RATING);
    }


    @Test
    @Transactional
    public void getAllRestaurantsByLatIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where lat equals to DEFAULT_LAT
        defaultRestaurantShouldBeFound("lat.equals=" + DEFAULT_LAT);

        // Get all the restaurantList where lat equals to UPDATED_LAT
        defaultRestaurantShouldNotBeFound("lat.equals=" + UPDATED_LAT);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByLatIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where lat in DEFAULT_LAT or UPDATED_LAT
        defaultRestaurantShouldBeFound("lat.in=" + DEFAULT_LAT + "," + UPDATED_LAT);

        // Get all the restaurantList where lat equals to UPDATED_LAT
        defaultRestaurantShouldNotBeFound("lat.in=" + UPDATED_LAT);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByLatIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where lat is not null
        defaultRestaurantShouldBeFound("lat.specified=true");

        // Get all the restaurantList where lat is null
        defaultRestaurantShouldNotBeFound("lat.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByLngIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where lng equals to DEFAULT_LNG
        defaultRestaurantShouldBeFound("lng.equals=" + DEFAULT_LNG);

        // Get all the restaurantList where lng equals to UPDATED_LNG
        defaultRestaurantShouldNotBeFound("lng.equals=" + UPDATED_LNG);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByLngIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where lng in DEFAULT_LNG or UPDATED_LNG
        defaultRestaurantShouldBeFound("lng.in=" + DEFAULT_LNG + "," + UPDATED_LNG);

        // Get all the restaurantList where lng equals to UPDATED_LNG
        defaultRestaurantShouldNotBeFound("lng.in=" + UPDATED_LNG);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByLngIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where lng is not null
        defaultRestaurantShouldBeFound("lng.specified=true");

        // Get all the restaurantList where lng is null
        defaultRestaurantShouldNotBeFound("lng.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByVisibleIsEqualToSomething() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where visible equals to DEFAULT_VISIBLE
        defaultRestaurantShouldBeFound("visible.equals=" + DEFAULT_VISIBLE);

        // Get all the restaurantList where visible equals to UPDATED_VISIBLE
        defaultRestaurantShouldNotBeFound("visible.equals=" + UPDATED_VISIBLE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByVisibleIsInShouldWork() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where visible in DEFAULT_VISIBLE or UPDATED_VISIBLE
        defaultRestaurantShouldBeFound("visible.in=" + DEFAULT_VISIBLE + "," + UPDATED_VISIBLE);

        // Get all the restaurantList where visible equals to UPDATED_VISIBLE
        defaultRestaurantShouldNotBeFound("visible.in=" + UPDATED_VISIBLE);
    }

    @Test
    @Transactional
    public void getAllRestaurantsByVisibleIsNullOrNotNull() throws Exception {
        // Initialize the database
        restaurantRepository.saveAndFlush(restaurant);

        // Get all the restaurantList where visible is not null
        defaultRestaurantShouldBeFound("visible.specified=true");

        // Get all the restaurantList where visible is null
        defaultRestaurantShouldNotBeFound("visible.specified=false");
    }

    @Test
    @Transactional
    public void getAllRestaurantsByCommentIsEqualToSomething() throws Exception {
        // Initialize the database
        Comment comment = CommentResourceIntTest.createEntity(em);
        em.persist(comment);
        em.flush();
        restaurant.addComment(comment);
        restaurantRepository.saveAndFlush(restaurant);
        Long commentId = comment.getId();

        // Get all the restaurantList where comment equals to commentId
        defaultRestaurantShouldBeFound("commentId.equals=" + commentId);

        // Get all the restaurantList where comment equals to commentId + 1
        defaultRestaurantShouldNotBeFound("commentId.equals=" + (commentId + 1));
    }


    @Test
    @Transactional
    public void getAllRestaurantsByCityIsEqualToSomething() throws Exception {
        // Initialize the database
        City city = CityResourceIntTest.createEntity(em);
        em.persist(city);
        em.flush();
        restaurant.setCity(city);
        restaurantRepository.saveAndFlush(restaurant);
        Long cityId = city.getId();

        // Get all the restaurantList where city equals to cityId
        defaultRestaurantShouldBeFound("cityId.equals=" + cityId);

        // Get all the restaurantList where city equals to cityId + 1
        defaultRestaurantShouldNotBeFound("cityId.equals=" + (cityId + 1));
    }


    @Test
    @Transactional
    public void getAllRestaurantsByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        restaurant.setUser(user);
        restaurantRepository.saveAndFlush(restaurant);
        Long userId = user.getId();

        // Get all the restaurantList where user equals to userId
        defaultRestaurantShouldBeFound("userId.equals=" + userId);

        // Get all the restaurantList where user equals to userId + 1
        defaultRestaurantShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllRestaurantsByPictureIsEqualToSomething() throws Exception {
        // Initialize the database
        Picture picture = PictureResourceIntTest.createEntity(em);
        em.persist(picture);
        em.flush();
        restaurant.setPicture(picture);
        restaurantRepository.saveAndFlush(restaurant);
        Long pictureId = picture.getId();

        // Get all the restaurantList where picture equals to pictureId
        defaultRestaurantShouldBeFound("pictureId.equals=" + pictureId);

        // Get all the restaurantList where picture equals to pictureId + 1
        defaultRestaurantShouldNotBeFound("pictureId.equals=" + (pictureId + 1));
    }


    @Test
    @Transactional
    public void getAllRestaurantsByKitchenIsEqualToSomething() throws Exception {
        // Initialize the database
        Kitchen kitchen = KitchenResourceIntTest.createEntity(em);
        em.persist(kitchen);
        em.flush();
        restaurant.addKitchen(kitchen);
        restaurantRepository.saveAndFlush(restaurant);
        Long kitchenId = kitchen.getId();

        // Get all the restaurantList where kitchen equals to kitchenId
        defaultRestaurantShouldBeFound("kitchenId.equals=" + kitchenId);

        // Get all the restaurantList where kitchen equals to kitchenId + 1
        defaultRestaurantShouldNotBeFound("kitchenId.equals=" + (kitchenId + 1));
    }


    @Test
    @Transactional
    public void getAllRestaurantsByFoodIsEqualToSomething() throws Exception {
        // Initialize the database
        Food food = FoodResourceIntTest.createEntity(em);
        em.persist(food);
        em.flush();
        restaurant.addFood(food);
        restaurantRepository.saveAndFlush(restaurant);
        Long foodId = food.getId();

        // Get all the restaurantList where food equals to foodId
        defaultRestaurantShouldBeFound("foodId.equals=" + foodId);

        // Get all the restaurantList where food equals to foodId + 1
        defaultRestaurantShouldNotBeFound("foodId.equals=" + (foodId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultRestaurantShouldBeFound(String filter) throws Exception {
        restRestaurantMockMvc.perform(get("/api/restaurants?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].infoEng").value(hasItem(DEFAULT_INFO_ENG.toString())))
            .andExpect(jsonPath("$.[*].infoHun").value(hasItem(DEFAULT_INFO_HUN.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK.toString())))
            .andExpect(jsonPath("$.[*].googlePlaceId").value(hasItem(DEFAULT_GOOGLE_PLACE_ID.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].lat").value(hasItem(DEFAULT_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].lng").value(hasItem(DEFAULT_LNG.doubleValue())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultRestaurantShouldNotBeFound(String filter) throws Exception {
        restRestaurantMockMvc.perform(get("/api/restaurants?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingRestaurant() throws Exception {
        // Get the restaurant
        restRestaurantMockMvc.perform(get("/api/restaurants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestaurant() throws Exception {
        // Initialize the database
        restaurantService.save(restaurant);

        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();

        // Update the restaurant
        Restaurant updatedRestaurant = restaurantRepository.findOne(restaurant.getId());
        // Disconnect from session so that the updates on updatedRestaurant are not directly saved in db
        em.detach(updatedRestaurant);
        updatedRestaurant
            .name(UPDATED_NAME)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .postalCode(UPDATED_POSTAL_CODE)
            .infoEng(UPDATED_INFO_ENG)
            .infoHun(UPDATED_INFO_HUN)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .website(UPDATED_WEBSITE)
            .facebook(UPDATED_FACEBOOK)
            .googlePlaceId(UPDATED_GOOGLE_PLACE_ID)
            .rating(UPDATED_RATING)
            .lat(UPDATED_LAT)
            .lng(UPDATED_LNG)
            .visible(UPDATED_VISIBLE);

        restRestaurantMockMvc.perform(put("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRestaurant)))
            .andExpect(status().isOk());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate);
        Restaurant testRestaurant = restaurantList.get(restaurantList.size() - 1);
        assertThat(testRestaurant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRestaurant.getStreetAddress()).isEqualTo(UPDATED_STREET_ADDRESS);
        assertThat(testRestaurant.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testRestaurant.getInfoEng()).isEqualTo(UPDATED_INFO_ENG);
        assertThat(testRestaurant.getInfoHun()).isEqualTo(UPDATED_INFO_HUN);
        assertThat(testRestaurant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testRestaurant.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testRestaurant.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testRestaurant.getFacebook()).isEqualTo(UPDATED_FACEBOOK);
        assertThat(testRestaurant.getGooglePlaceId()).isEqualTo(UPDATED_GOOGLE_PLACE_ID);
        assertThat(testRestaurant.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testRestaurant.getLat()).isEqualTo(UPDATED_LAT);
        assertThat(testRestaurant.getLng()).isEqualTo(UPDATED_LNG);
        assertThat(testRestaurant.isVisible()).isEqualTo(UPDATED_VISIBLE);

        // Validate the Restaurant in Elasticsearch
        Restaurant restaurantEs = restaurantSearchRepository.findOne(testRestaurant.getId());
        assertThat(restaurantEs).isEqualToIgnoringGivenFields(testRestaurant);
    }

    @Test
    @Transactional
    public void updateNonExistingRestaurant() throws Exception {
        int databaseSizeBeforeUpdate = restaurantRepository.findAll().size();

        // Create the Restaurant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRestaurantMockMvc.perform(put("/api/restaurants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurant)))
            .andExpect(status().isCreated());

        // Validate the Restaurant in the database
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRestaurant() throws Exception {
        // Initialize the database
        restaurantService.save(restaurant);

        int databaseSizeBeforeDelete = restaurantRepository.findAll().size();

        // Get the restaurant
        restRestaurantMockMvc.perform(delete("/api/restaurants/{id}", restaurant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean restaurantExistsInEs = restaurantSearchRepository.exists(restaurant.getId());
        assertThat(restaurantExistsInEs).isFalse();

        // Validate the database is empty
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        assertThat(restaurantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRestaurant() throws Exception {
        // Initialize the database
        restaurantService.save(restaurant);

        // Search the restaurant
        restRestaurantMockMvc.perform(get("/api/_search/restaurants?query=id:" + restaurant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].infoEng").value(hasItem(DEFAULT_INFO_ENG.toString())))
            .andExpect(jsonPath("$.[*].infoHun").value(hasItem(DEFAULT_INFO_HUN.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK.toString())))
            .andExpect(jsonPath("$.[*].googlePlaceId").value(hasItem(DEFAULT_GOOGLE_PLACE_ID.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].lat").value(hasItem(DEFAULT_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].lng").value(hasItem(DEFAULT_LNG.doubleValue())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Restaurant.class);
        Restaurant restaurant1 = new Restaurant();
        restaurant1.setId(1L);
        Restaurant restaurant2 = new Restaurant();
        restaurant2.setId(restaurant1.getId());
        assertThat(restaurant1).isEqualTo(restaurant2);
        restaurant2.setId(2L);
        assertThat(restaurant1).isNotEqualTo(restaurant2);
        restaurant1.setId(null);
        assertThat(restaurant1).isNotEqualTo(restaurant2);
    }
}
