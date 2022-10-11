package com.usa.reto3.controller;

import com.usa.reto3.entities.DTOs.CountClient;
import com.usa.reto3.entities.DTOs.CountStatus;
import com.usa.reto3.entities.Reservation;
import com.usa.reto3.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ReservationController {
    @Autowired
    private ReservationService reservationService;
    @GetMapping("/all")
    public List<Reservation> getAll(){
        return reservationService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation p){
        return reservationService.save(p);
    }




    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Reservation> getAllReservation2() {
        return reservationService.getAll();
    }
    @DeleteMapping("/{idReservation}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteReservation(@PathVariable Integer idReservation) {
        return reservationService.delete(idReservation);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return reservationService.update(reservation);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> update(@PathVariable Integer id) {
        Reservation reservation;
        try {
            reservation = reservationService.getReservation(id).get();
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/report-clients")
    public  List<CountClient> getClientCasher(){
        return reservationService.getClientCasher();
    }
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReportReservationsBetweenDates(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo") String dateTwo){
        return reservationService.getReservationsBetweenDates(dateOne, dateTwo);
    }
    @GetMapping("/report-status")
    public CountStatus getReportStatus(){
        return reservationService.getReservationsStatus();
    }
}
