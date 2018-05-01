package com.elte.reserved.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "restaurant")
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "info")
    private String info;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "website")
    private String website;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "google_place_id")
    private String googlePlaceId;

    @ManyToOne(optional = false)
    @NotNull
    private City city;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_kitchen",
        joinColumns = @JoinColumn(name = "restaurants_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "kitchens_id", referencedColumnName = "id"))
    private Set<Kitchen> kitchens = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_food",
        joinColumns = @JoinColumn(name = "restaurants_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "foods_id", referencedColumnName = "id"))
    private Set<Food> foods = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_picture",
        joinColumns = @JoinColumn(name = "restaurants_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "pictures_id", referencedColumnName = "id"))
    private Set<Picture> pictures = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "restaurant_user",
        joinColumns = @JoinColumn(name = "restaurants_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "users_id", referencedColumnName = "id"))
    private Set<User> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public Restaurant streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Restaurant postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Restaurant info(String info) {
        this.info = info;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Restaurant email(String email) {
        this.email = email;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Restaurant phone(String phone) {
        this.phone = phone;
        return this;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Restaurant website(String website) {
        this.website = website;
        return this;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public Restaurant facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public String getGooglePlaceId() {
        return googlePlaceId;
    }

    public void setGooglePlaceId(String googlePlaceId) {
        this.googlePlaceId = googlePlaceId;
    }

    public Restaurant googlePlaceId(String googlePlaceId) {
        this.googlePlaceId = googlePlaceId;
        return this;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Restaurant city(City city) {
        this.city = city;
        return this;
    }

    public Set<Kitchen> getKitchens() {
        return kitchens;
    }

    public void setKitchens(Set<Kitchen> kitchens) {
        this.kitchens = kitchens;
    }

    public Restaurant kitchens(Set<Kitchen> kitchens) {
        this.kitchens = kitchens;
        return this;
    }

    public Restaurant addKitchen(Kitchen kitchen) {
        this.kitchens.add(kitchen);
        return this;
    }

    public Restaurant removeKitchen(Kitchen kitchen) {
        this.kitchens.remove(kitchen);
        return this;
    }

    public Set<Food> getFoods() {
        return foods;
    }

    public void setFoods(Set<Food> foods) {
        this.foods = foods;
    }

    public Restaurant foods(Set<Food> foods) {
        this.foods = foods;
        return this;
    }

    public Restaurant addFood(Food food) {
        this.foods.add(food);
        return this;
    }

    public Restaurant removeFood(Food food) {
        this.foods.remove(food);
        return this;
    }

    public Set<Picture> getPictures() {
        return pictures;
    }

    public void setPictures(Set<Picture> pictures) {
        this.pictures = pictures;
    }

    public Restaurant pictures(Set<Picture> pictures) {
        this.pictures = pictures;
        return this;
    }

    public Restaurant addPicture(Picture picture) {
        this.pictures.add(picture);
        return this;
    }

    public Restaurant removePicture(Picture picture) {
        this.pictures.remove(picture);
        return this;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Restaurant users(Set<User> users) {
        this.users = users;
        return this;
    }

    public Restaurant addUser(User user) {
        this.users.add(user);
        return this;
    }

    public Restaurant removeUser(User user) {
        this.users.remove(user);
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
        Restaurant restaurant = (Restaurant) o;
        if (restaurant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", info='" + getInfo() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", website='" + getWebsite() + "'" +
            ", facebook='" + getFacebook() + "'" +
            ", googlePlaceId='" + getGooglePlaceId() + "'" +
            "}";
    }
}
