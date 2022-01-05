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

import com.codonsensemble.jobfinder.model.EntrepriseResource;
import com.codonsensemble.jobfinder.service.EntrepriseService;

@RestController
@RequestMapping(value = "/api/entreprises")
public class EntrepriseController {

    private final EntrepriseService entrepriseService;

    public EntrepriseController(EntrepriseService entrepriseService){
        this.entrepriseService = entrepriseService;
    }

    @GetMapping
    public ResponseEntity<List<EntrepriseResource>> readEntreprises(){
        return ResponseEntity.ok(this.entrepriseService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntrepriseResource> readEntreprise(@PathVariable("id") UUID id){
        return ResponseEntity.ok(this.entrepriseService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EntrepriseResource> createEntreprise(@RequestBody  EntrepriseResource entrepriseResource){
        return ResponseEntity.ok(this.entrepriseService.create(entrepriseResource));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntrepriseResource> updateEntreprise(@PathVariable("id") UUID id, @RequestBody  EntrepriseResource entrepriseResource){
        return ResponseEntity.ok(this.entrepriseService.update(id, entrepriseResource));
    }
}
