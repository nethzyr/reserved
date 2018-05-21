package com.elte.reserved.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A UserInfo.
 */
@Entity
@Table(name = "user_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "userinfo")
public class UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "phone")
    private String phone;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    private Picture picture;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_preferred_city",
        joinColumns = @JoinColumn(name = "user_infos_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "preferred_cities_id", referencedColumnName = "id"))
    private Set<City> preferredCities = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_favorite_restaurant",
        joinColumns = @JoinColumn(name = "user_infos_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "favorite_restaurants_id", referencedColumnName = "id"))
    private Set<Restaurant> favoriteRestaurants = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_favorite_kitchen",
        joinColumns = @JoinColumn(name = "user_infos_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "favorite_kitchens_id", referencedColumnName = "id"))
    private Set<Kitchen> favoriteKitchens = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_favorite_food",
        joinColumns = @JoinColumn(name = "user_infos_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "favorite_foods_id", referencedColumnName = "id"))
    private Set<Food> favoriteFoods = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public UserInfo facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public UserInfo phone(String phone) {
        this.phone = phone;
        return this;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserInfo user(User user) {
        this.user = user;
        return this;
    }

    public Picture getPicture() {
        return picture;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    public UserInfo picture(Picture picture) {
        this.picture = picture;
        return this;
    }

    public Set<City> getPreferredCities() {
        return preferredCities;
    }

    public void setPreferredCities(Set<City> cities) {
        this.preferredCities = cities;
    }

    public UserInfo preferredCities(Set<City> cities) {
        this.preferredCities = cities;
        return this;
    }

    public UserInfo addPreferredCity(City city) {
        this.preferredCities.add(city);
        return this;
    }

    public UserInfo removePreferredCity(City city) {
        this.preferredCities.remove(city);
        return this;
    }

    public Set<Restaurant> getFavoriteRestaurants() {
        return favoriteRestaurants;
    }

    public void setFavoriteRestaurants(Set<Restaurant> restaurants) {
        this.favoriteRestaurants = restaurants;
    }

    public UserInfo favoriteRestaurants(Set<Restaurant> restaurants) {
        this.favoriteRestaurants = restaurants;
        return this;
    }

    public UserInfo addFavoriteRestaurant(Restaurant restaurant) {
        this.favoriteRestaurants.add(restaurant);
        return this;
    }

    public UserInfo removeFavoriteRestaurant(Restaurant restaurant) {
        this.favoriteRestaurants.remove(restaurant);
        return this;
    }

    public Set<Kitchen> getFavoriteKitchens() {
        return favoriteKitchens;
    }

    public void setFavoriteKitchens(Set<Kitchen> kitchens) {
        this.favoriteKitchens = kitchens;
    }

    public UserInfo favoriteKitchens(Set<Kitchen> kitchens) {
        this.favoriteKitchens = kitchens;
        return this;
    }

    public UserInfo addFavoriteKitchen(Kitchen kitchen) {
        this.favoriteKitchens.add(kitchen);
        return this;
    }

    public UserInfo removeFavoriteKitchen(Kitchen kitchen) {
        this.favoriteKitchens.remove(kitchen);
        return this;
    }

    public Set<Food> getFavoriteFoods() {
        return favoriteFoods;
    }

    public void setFavoriteFoods(Set<Food> foods) {
        this.favoriteFoods = foods;
    }

    public UserInfo favoriteFoods(Set<Food> foods) {
        this.favoriteFoods = foods;
        return this;
    }

    public UserInfo addFavoriteFood(Food food) {
        this.favoriteFoods.add(food);
        return this;
    }

    public UserInfo removeFavoriteFood(Food food) {
        this.favoriteFoods.remove(food);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserInfo userInfo = (UserInfo) o;
        if (userInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserInfo{" +
            "id=" + getId() +
            ", facebook='" + getFacebook() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
