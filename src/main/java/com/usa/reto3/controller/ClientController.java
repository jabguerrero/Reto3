package com.usa.reto3.controller;

import com.usa.reto3.entities.Client;
import com.usa.reto3.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/Client")
public class ClientController {
    @Autowired
    private ClientService clientService;
    @GetMapping("/all")
    public List<Client> getAll(){
        return clientService.getAll();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save(@RequestBody Client p){
        return clientService.save(p);
    }




    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Client> getAllClient2() {
        return clientService.getAll();
    }

    @DeleteMapping("/delete/{idClient}")
    public boolean deleteClient(@PathVariable Integer idClient) {
        return clientService.delete(idClient);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Client updateClient(@RequestBody Client client) {
        return clientService.update(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> update(@PathVariable Integer id) {
        Client client;
        try {
            client = clientService.getClient(id).get();
            return new ResponseEntity<>(client, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
