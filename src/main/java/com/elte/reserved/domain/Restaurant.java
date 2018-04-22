package com.elte.reserved.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

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

    @Column(name = "created")
    private Instant created;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "postal_code")
    private String postalCode;

    @Lob
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
               joinColumns = @JoinColumn(name="restaurants_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="kitchens_id", referencedColumnName="id"))
    private Set<Kitchen> kitchens = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_food",
               joinColumns = @JoinColumn(name="restaurants_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="foods_id", referencedColumnName="id"))
    private Set<Food> foods = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_picture",
               joinColumns = @JoinColumn(name="restaurants_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="pictures_id", referencedColumnName="id"))
    private Set<Picture> pictures = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "restaurant_user",
               joinColumns = @JoinColumn(name="restaurants_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="users_id", referencedColumnName="id"))
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

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreated() {
        return created;
    }

    public Restaurant created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Restaurant streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Restaurant postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getInfo() {
        return info;
    }

    public Restaurant info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getEmail() {
        return email;
    }

    public Restaurant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public Restaurant phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWebsite() {
        return website;
    }

    public Restaurant website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getFacebook() {
        return facebook;
    }

    public Restaurant facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getGooglePlaceId() {
        return googlePlaceId;
    }

    public Restaurant googlePlaceId(String googlePlaceId) {
        this.googlePlaceId = googlePlaceId;
        return this;
    }

    public void setGooglePlaceId(String googlePlaceId) {
        this.googlePlaceId = googlePlaceId;
    }

    public City getCity() {
        return city;
    }

    public Restaurant city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Set<Kitchen> getKitchens() {
        return kitchens;
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

    public void setKitchens(Set<Kitchen> kitchens) {
        this.kitchens = kitchens;
    }

    public Set<Food> getFoods() {
        return foods;
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

    public void setFoods(Set<Food> foods) {
        this.foods = foods;
    }

    public Set<Picture> getPictures() {
        return pictures;
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

    public void setPictures(Set<Picture> pictures) {
        this.pictures = pictures;
    }

    public Set<User> getUsers() {
        return users;
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

    public void setUsers(Set<User> users) {
        this.users = users;
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
            ", created='" + getCreated() + "'" +
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
