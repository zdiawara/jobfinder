package com.codonsensemble.jobfinder.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.codonsensemble.jobfinder.converter.EntrepriseRecordToResource;
import com.codonsensemble.jobfinder.model.EntrepriseResource;
import com.codonsensemble.jobfinder.repository.EntrepriseRepository;

@Service
public class EntrepriseService {

    private final EntrepriseRepository entrepriseRepository;
    private final EntrepriseRecordToResource entrepriseRecordToResource;

    public EntrepriseService(EntrepriseRepository entrepriseRepository,
            EntrepriseRecordToResource entrepriseRecordToResource){
        this.entrepriseRepository = entrepriseRepository;
        this.entrepriseRecordToResource = entrepriseRecordToResource;
    }

    public List<EntrepriseResource> findAll(){
        return entrepriseRepository.findAll()
                .stream()
                .map(entrepriseRecordToResource::convert)
                .collect(Collectors.toList());
    }

    public EntrepriseResource findById(UUID id){
        return entrepriseRepository.findById(id)
                .map(entrepriseRecordToResource::convert)
                .orElseThrow(()->new RuntimeException(""));
    }

    public EntrepriseResource create(EntrepriseResource entrepriseResource){
        return entrepriseRepository.create(entrepriseResource)
                .map(entrepriseRecordToResource::convert)
                .orElseThrow(()->new RuntimeException(""));
    }

    public EntrepriseResource update(UUID id, EntrepriseResource entrepriseResource){
        return entrepriseRepository.update(id, entrepriseResource)
                .map(entrepriseRecordToResource::convert)
                .orElseThrow(()->new RuntimeException(""));
    }

}
