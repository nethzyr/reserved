package com.elte.reserved.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "phone")
    private String phone;

    @ManyToOne
    private Picture picture;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_preferred_city",
               joinColumns = @JoinColumn(name="user_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="preferred_cities_id", referencedColumnName="id"))
    private Set<City> preferredCities = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_info_favorite_restaurant",
               joinColumns = @JoinColumn(name="user_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="favorite_restaurants_id", referencedColumnName="id"))
    private Set<Restaurant> favoriteRestaurants = new HashSet<>();

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

    public UserInfo facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getPhone() {
        return phone;
    }

    public UserInfo phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Picture getPicture() {
        return picture;
    }

    public UserInfo picture(Picture picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    public User getUser() {
        return user;
    }

    public UserInfo user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<City> getPreferredCities() {
        return preferredCities;
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

    public void setPreferredCities(Set<City> cities) {
        this.preferredCities = cities;
    }

    public Set<Restaurant> getFavoriteRestaurants() {
        return favoriteRestaurants;
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

    public void setFavoriteRestaurants(Set<Restaurant> restaurants) {
        this.favoriteRestaurants = restaurants;
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
