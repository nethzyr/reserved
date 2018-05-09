package com.elte.reserved.service.dto;

import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

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

    private StringFilter info;

    private StringFilter email;

    private StringFilter phone;

    private StringFilter website;

    private StringFilter facebook;

    private StringFilter googlePlaceId;

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

    public StringFilter getInfo() {
        return info;
    }

    public void setInfo(StringFilter info) {
        this.info = info;
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
            (info != null ? "info=" + info + ", " : "") +
            (email != null ? "email=" + email + ", " : "") +
            (phone != null ? "phone=" + phone + ", " : "") +
            (website != null ? "website=" + website + ", " : "") +
            (facebook != null ? "facebook=" + facebook + ", " : "") +
            (googlePlaceId != null ? "googlePlaceId=" + googlePlaceId + ", " : "") +
            (cityId != null ? "cityId=" + cityId + ", " : "") +
            (userId != null ? "userId=" + userId + ", " : "") +
            (pictureId != null ? "pictureId=" + pictureId + ", " : "") +
            (kitchenId != null ? "kitchenId=" + kitchenId + ", " : "") +
            (foodId != null ? "foodId=" + foodId + ", " : "") +
            "}";
    }

}
