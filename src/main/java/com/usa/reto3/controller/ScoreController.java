package com.usa.reto3.controller;

import com.usa.reto3.entities.Score;
import com.usa.reto3.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/Score")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ScoreController {
    @Autowired
    private ScoreService scoreService;
    @GetMapping("/all")
    public List<Score> getAll(){
        return scoreService.getAll();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Score save(@RequestBody Score p){
        return scoreService.save(p);
    }


    //@PostMapping("/all")
    //@ResponseStatus(HttpStatus.CREATED)
    //public List<Score> getAllScore2() {
    //    return scoreService.getAll();
    //}

    @DeleteMapping("/{idScore}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteScore(@PathVariable Integer idScore) {
        return scoreService.delete(idScore);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Score> get(@PathVariable Integer id) {
        try {
            Score motorbike = scoreService.get(id);
            return new ResponseEntity<Score>(motorbike, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Score>(HttpStatus.NOT_FOUND);
        }

    }

}
