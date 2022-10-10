package com.usa.reto3.controller;

import com.usa.reto3.entities.Category;
import com.usa.reto3.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Id;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/Category")
@CrossOrigin(origins = "*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping("/all")
    public List<Category> getAll(){
        return categoryService.getAll();
    }
    //@GetMapping("/{id}")
    //public Optional<Category> getCategory(@PathVariable("id") int id){
    //    return categoryService.getCategory(id);
    //}

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Category save(@RequestBody Category p){
        return categoryService.save(p);
    }




    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Category> getAllClient2() {
        return categoryService.getAll();
    }

    @DeleteMapping("/{idCategory}")
    public boolean deleteCategory(@PathVariable Integer idCategory) {
        return categoryService.delete(idCategory);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Category updateCategory(@RequestBody Category category) {
        return categoryService.update(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Integer id) {
        Category category;
        try {
            category = categoryService.getCategory(id).get();
            return new ResponseEntity<>(category, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
