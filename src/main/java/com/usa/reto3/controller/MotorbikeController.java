package com.usa.reto3.controller;

import com.usa.reto3.entities.Motorbike;
import com.usa.reto3.service.MotorbikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/Motorbike")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class MotorbikeController {
    @Autowired
    private MotorbikeService motorbikeService;
    @GetMapping("/all")
    public List<Motorbike> getAll(){
        return motorbikeService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Motorbike save(@RequestBody Motorbike p){
        return motorbikeService.save(p);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Motorbike> get(@PathVariable Integer id) {
        try {
            Motorbike motorbike = motorbikeService.get(id);
            return new ResponseEntity<>(motorbike, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Motorbike> getAllMotorbike2() {
        return motorbikeService.getAll();
    }
    @DeleteMapping("/{idMotorbike}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteMotorbike(@PathVariable Integer idMotorbike) {
        return motorbikeService.delete(idMotorbike);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Motorbike updateMotorbike(@RequestBody Motorbike motorbike) {
        return motorbikeService.update(motorbike);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Motorbike> update(@PathVariable Integer id) {
        motorbikeService.getMotorbike(id).get();
        Motorbike motorbike;
        try {
            motorbike = motorbikeService.getMotorbike(id).get();
            return new ResponseEntity<>(motorbike, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
