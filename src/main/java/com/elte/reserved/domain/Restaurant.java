package com.elte.reserved.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Email;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "postal_code")
    private String postalCode;

    @Size(max = 1000)
    @Column(name = "info_eng", length = 1000)
    private String infoEng;

    @Size(max = 1000)
    @Column(name = "info_hun", length = 1000)
    private String infoHun;

    @NotNull
    @Email
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "website")
    private String website;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "google_place_id")
    private String googlePlaceId;

    @Column(name = "rating")
    private Integer rating = 0;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;

    @Column(name = "visible")
    private Boolean visible = false;

    @OneToMany(mappedBy = "restaurant")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private City city;

    @ManyToOne
    private User user;

    @ManyToOne
    private Picture picture;

    @ManyToMany
    @Fetch(FetchMode.JOIN)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_kitchen",
               joinColumns = @JoinColumn(name="restaurants_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="kitchens_id", referencedColumnName="id"))
    private Set<Kitchen> kitchens = new HashSet<>();

    @ManyToMany
    @Fetch(FetchMode.JOIN)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "restaurant_food",
               joinColumns = @JoinColumn(name="restaurants_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="foods_id", referencedColumnName="id"))
    private Set<Food> foods = new HashSet<>();

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

    public String getInfoEng() {
        return infoEng;
    }

    public Restaurant infoEng(String infoEng) {
        this.infoEng = infoEng;
        return this;
    }

    public void setInfoEng(String infoEng) {
        this.infoEng = infoEng;
    }

    public String getInfoHun() {
        return infoHun;
    }

    public Restaurant infoHun(String infoHun) {
        this.infoHun = infoHun;
        return this;
    }

    public void setInfoHun(String infoHun) {
        this.infoHun = infoHun;
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

    public Integer getRating() {
        return rating;
    }

    public Restaurant rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Double getLat() {
        return lat;
    }

    public Restaurant lat(Double lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public Restaurant lng(Double lng) {
        this.lng = lng;
        return this;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Boolean isVisible() {
        return visible;
    }

    public Restaurant visible(Boolean visible) {
        this.visible = visible;
        return this;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Restaurant comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Restaurant addComment(Comment comment) {
        this.comments.add(comment);
        comment.setRestaurant(this);
        return this;
    }

    public Restaurant removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setRestaurant(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
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

    public User getUser() {
        return user;
    }

    public Restaurant user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Picture getPicture() {
        return picture;
    }

    public Restaurant picture(Picture picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
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
            ", infoEng='" + getInfoEng() + "'" +
            ", infoHun='" + getInfoHun() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", website='" + getWebsite() + "'" +
            ", facebook='" + getFacebook() + "'" +
            ", googlePlaceId='" + getGooglePlaceId() + "'" +
            ", rating=" + getRating() +
            ", lat=" + getLat() +
            ", lng=" + getLng() +
            ", visible='" + isVisible() + "'" +
            "}";
    }
}
