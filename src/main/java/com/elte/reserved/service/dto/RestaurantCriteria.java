package com.elte.reserved.service.dto;

import io.github.jhipster.service.filter.*;

import java.io.Serializable;


/**
 * Criteria class for the Restaurant entity. This class is used in RestaurantResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /restaurants?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class RestaurantCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter name;

    private StringFilter streetAddress;

    private StringFilter postalCode;

    private StringFilter infoEng;

    private StringFilter infoHun;

    private StringFilter email;

    private StringFilter phone;

    private StringFilter website;

    private StringFilter facebook;

    private StringFilter googlePlaceId;

    private IntegerFilter rating;

    private DoubleFilter lat;

    private DoubleFilter lng;

    private BooleanFilter visible;

    private LongFilter commentId;

    private LongFilter cityId;

    private LongFilter userId;

    private LongFilter pictureId;

    private LongFilter kitchenId;

    private LongFilter foodId;

    public RestaurantCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public StringFilter getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(StringFilter streetAddress) {
        this.streetAddress = streetAddress;
    }

    public StringFilter getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(StringFilter postalCode) {
        this.postalCode = postalCode;
    }

    public StringFilter getInfoEng() {
        return infoEng;
    }

    public void setInfoEng(StringFilter infoEng) {
        this.infoEng = infoEng;
    }

    public StringFilter getInfoHun() {
        return infoHun;
    }

    public void setInfoHun(StringFilter infoHun) {
        this.infoHun = infoHun;
    }

    public StringFilter getEmail() {
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public StringFilter getPhone() {
        return phone;
    }

    public void setPhone(StringFilter phone) {
        this.phone = phone;
    }

    public StringFilter getWebsite() {
        return website;
    }

    public void setWebsite(StringFilter website) {
        this.website = website;
    }

    public StringFilter getFacebook() {
        return facebook;
    }

    public void setFacebook(StringFilter facebook) {
        this.facebook = facebook;
    }

    public StringFilter getGooglePlaceId() {
        return googlePlaceId;
    }

    public void setGooglePlaceId(StringFilter googlePlaceId) {
        this.googlePlaceId = googlePlaceId;
    }

    public IntegerFilter getRating() {
        return rating;
    }

    public void setRating(IntegerFilter rating) {
        this.rating = rating;
    }

    public DoubleFilter getLat() {
        return lat;
    }

    public void setLat(DoubleFilter lat) {
        this.lat = lat;
    }

    public DoubleFilter getLng() {
        return lng;
    }

    public void setLng(DoubleFilter lng) {
        this.lng = lng;
    }

    public BooleanFilter getVisible() {
        return visible;
    }

    public void setVisible(BooleanFilter visible) {
        this.visible = visible;
    }

    public LongFilter getCommentId() {
        return commentId;
    }

    public void setCommentId(LongFilter commentId) {
        this.commentId = commentId;
    }

    public LongFilter getCityId() {
        return cityId;
    }

    public void setCityId(LongFilter cityId) {
        this.cityId = cityId;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getPictureId() {
        return pictureId;
    }

    public void setPictureId(LongFilter pictureId) {
        this.pictureId = pictureId;
    }

    public LongFilter getKitchenId() {
        return kitchenId;
    }

    public void setKitchenId(LongFilter kitchenId) {
        this.kitchenId = kitchenId;
    }

    public LongFilter getFoodId() {
        return foodId;
    }

    public void setFoodId(LongFilter foodId) {
        this.foodId = foodId;
    }

    @Override
    public String toString() {
        return "RestaurantCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (name != null ? "name=" + name + ", " : "") +
            (streetAddress != null ? "streetAddress=" + streetAddress + ", " : "") +
            (postalCode != null ? "postalCode=" + postalCode + ", " : "") +
            (infoEng != null ? "infoEng=" + infoEng + ", " : "") +
            (infoHun != null ? "infoHun=" + infoHun + ", " : "") +
            (email != null ? "email=" + email + ", " : "") +
            (phone != null ? "phone=" + phone + ", " : "") +
            (website != null ? "website=" + website + ", " : "") +
            (facebook != null ? "facebook=" + facebook + ", " : "") +
            (googlePlaceId != null ? "googlePlaceId=" + googlePlaceId + ", " : "") +
            (rating != null ? "rating=" + rating + ", " : "") +
            (lat != null ? "lat=" + lat + ", " : "") +
            (lng != null ? "lng=" + lng + ", " : "") +
            (visible != null ? "visible=" + visible + ", " : "") +
            (commentId != null ? "commentId=" + commentId + ", " : "") +
            (cityId != null ? "cityId=" + cityId + ", " : "") +
            (userId != null ? "userId=" + userId + ", " : "") +
            (pictureId != null ? "pictureId=" + pictureId + ", " : "") +
            (kitchenId != null ? "kitchenId=" + kitchenId + ", " : "") +
            (foodId != null ? "foodId=" + foodId + ", " : "") +
            "}";
    }

}
