package com.usa.reto3.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "client")
public class Client implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idClient;
    @Column(length = 45)
    private String email;
    @Column(length = 45)
    private String password;
    @Column(length = 250)
    private String name;
    private Integer age;
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    @JsonIgnoreProperties("client")
    private List<Message> messages;
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    @JsonIgnoreProperties("client")
    private List<Reservation> reservations;

    public Client(){
        this.reservations = new ArrayList<>();
        this.messages = new ArrayList<>();
    }
    public Client(Integer idClient) {
        this.idClient = idClient;
        this.reservations = new ArrayList<>();
        this.messages = new ArrayList<>();
    }
    public Client(Integer id, String name, String email, String password, Integer age) {
        this.idClient = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.reservations = new ArrayList<>();
        this.messages = new ArrayList<>();
    }
    public Integer getIdClient() {
        return idClient;
    }

    public void setIdClient(Integer idClient) {
        this.idClient = idClient;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
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

