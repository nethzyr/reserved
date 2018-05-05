package com.elte.reserved.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "reservation")
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_time", nullable = false)
    private Instant time;

    @NotNull
    @Column(name = "people", nullable = false)
    private Integer people;

    @Column(name = "confirmed")
    private Boolean confirmed;

    @Size(max = 20)
    @Column(name = "confirmation_key", length = 20)
    private String confirmationKey;

    @ManyToOne(optional = false)
    @NotNull
    private Restaurant restaurant;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public Reservation time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public Integer getPeople() {
        return people;
    }

    public Reservation people(Integer people) {
        this.people = people;
        return this;
    }

    public void setPeople(Integer people) {
        this.people = people;
    }

    public Boolean isConfirmed() {
        return confirmed;
    }

    public Reservation confirmed(Boolean confirmed) {
        this.confirmed = confirmed;
        return this;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    public String getConfirmationKey() {
        return confirmationKey;
    }

    public Reservation confirmationKey(String confirmationKey) {
        this.confirmationKey = confirmationKey;
        return this;
    }

    public void setConfirmationKey(String confirmationKey) {
        this.confirmationKey = confirmationKey;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Reservation restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public User getUser() {
        return user;
    }

    public Reservation user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Reservation reservation = (Reservation) o;
        if (reservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", people=" + getPeople() +
            ", confirmed='" + isConfirmed() + "'" +
            ", confirmationKey='" + getConfirmationKey() + "'" +
            "}";
    }
}
