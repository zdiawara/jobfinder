package com.codonsensemble.jobfinder.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codonsensemble.jobfinder.model.CategorieResource;
import com.codonsensemble.jobfinder.service.CategorieService;

@RestController
@RequestMapping(value = "/api/categories")
public class CategorieController {

    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService){
        this.categorieService = categorieService;
    }

    @GetMapping
    public ResponseEntity<List<CategorieResource>> readCategories(){
        return ResponseEntity.ok(this.categorieService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategorieResource> readCategorie(@PathVariable("id") UUID id){
        return ResponseEntity.ok(this.categorieService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CategorieResource> createCategorie(@RequestBody CategorieResource categorieResource){
        return ResponseEntity.ok(this.categorieService.create(categorieResource));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategorieResource> updateCategorie(@PathVariable("id") UUID id, @RequestBody CategorieResource categorieResource){
        return ResponseEntity.ok(this.categorieService.update(id, categorieResource));
    }
}
