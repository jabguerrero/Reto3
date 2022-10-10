package com.usa.reto3.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "motorbike")
public class Motorbike implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMotorbike")
    private Integer id;
    @Column(length = 45)
    private String name;
    @Column(length = 45)
    private String brand;
    @Column(name = "years")
    private Integer year;
    @Column(length = 250)
    private String description;
    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("motorbikes")
    private Category category;
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "motorbike")
    @JsonIgnoreProperties({"motorbike","client"})
    private List<Message> messages;
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "motorbike")
    @JsonIgnoreProperties({"motorbike"})
    private List<Reservation> reservations;

    public Motorbike() {
        this.reservations = new ArrayList<>();
        this.messages = new ArrayList<>();
    }
    public Motorbike(Integer id) {
        this.id = id;
        this.reservations = new ArrayList<>();
        this.messages = new ArrayList<>();
    }
    public Motorbike(Integer id, String brand, String name, Integer year, String description, Category category) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.year = year;
        this.description = description;
        this.category = category;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public Integer getYear() {
        return year;
    }
    public void setYear(Integer year) {
        this.year = year;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public List<Message> getMessages() {
        return messages;
    }
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
    public List<Reservation> getReservations() {
        return reservations;
    }
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}

