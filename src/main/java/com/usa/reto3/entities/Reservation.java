package com.usa.reto3.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "reservation")
public class Reservation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;
    @Column(name = "startDate", nullable = false)
    private Date startDate;
    @Column(name = "devolutionDate", nullable = false)
    private Date devolutionDate;
    private String status="created";
    @ManyToOne
    @JoinColumn(name = "motorbikeId")
    @JsonIgnoreProperties("reservations")
    private Motorbike motorbike;
    @ManyToOne
    @JoinColumn(name = "ClientId")
    @JsonIgnoreProperties({"reservations","messages"})
    private Client client;
    @OneToOne(cascade = {CascadeType.REMOVE},mappedBy="reservation")
    @JsonIgnoreProperties("reservation")
    private Score score;
    public Reservation(){
    }
    public Reservation(Integer idReservation, Date startDate, Date devolutionDate, String status, Motorbike motorbike, Client client, Score score) {
        this.idReservation = idReservation;
        this.startDate = startDate;
        this.devolutionDate = devolutionDate;
        this.status = status;
        this.motorbike = motorbike;
        this.client = client;
        this.score = score;
    }
    public Integer getIdReservation() {
        return idReservation;
    }
    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    public Date getDevolutionDate() {
        return devolutionDate;
    }
    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Motorbike getMotorbike() {
        return motorbike;
    }
    public void setMotorbike(Motorbike motorbike) {
        this.motorbike = motorbike;
    }
    public Client getClient() {
        return client;
    }
    public void setClient(Client client) {
        this.client = client;
    }
    public Score getScore() {
        return score;
    }
    public void setScore(Score score) {
        this.score = score;
    }
}
