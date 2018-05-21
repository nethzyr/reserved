package com.elte.reserved.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Food.
 */
@Entity
@Table(name = "food")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "food")
public class Food implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "type_eng", nullable = false)
    private String typeEng;

    @NotNull
    @Column(name = "type_hun", nullable = false)
    private String typeHun;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeEng() {
        return typeEng;
    }

    public Food typeEng(String typeEng) {
        this.typeEng = typeEng;
        return this;
    }

    public void setTypeEng(String typeEng) {
        this.typeEng = typeEng;
    }

    public String getTypeHun() {
        return typeHun;
    }

    public Food typeHun(String typeHun) {
        this.typeHun = typeHun;
        return this;
    }

    public void setTypeHun(String typeHun) {
        this.typeHun = typeHun;
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
        Food food = (Food) o;
        if (food.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), food.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Food{" +
            "id=" + getId() +
            ", typeEng='" + getTypeEng() + "'" +
            ", typeHun='" + getTypeHun() + "'" +
            "}";
    }
}
