package com.codonsensemble.jobfinder.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.codonsensemble.jobfinder.converter.CategorieRecordToResource;
import com.codonsensemble.jobfinder.model.CategorieResource;
import com.codonsensemble.jobfinder.model.JobFilter;
import com.codonsensemble.jobfinder.repository.CategorieRepository;

@Service
public class CategorieService {

    private final CategorieRepository categorieRepository;
    private final CategorieRecordToResource categorieRecordToResource;

    public CategorieService(CategorieRepository categorieRepository,
            CategorieRecordToResource categorieRecordToResource){
        this.categorieRepository = categorieRepository;
        this.categorieRecordToResource = categorieRecordToResource;
    }

    public List<CategorieResource> findAll(){
        return categorieRepository.findAll()
                .stream()
                .map(categorieRecordToResource::convert)
                .collect(Collectors.toList());
    }

    public CategorieResource findById(UUID id){
        return categorieRepository.findById(id)
                .map(categorieRecordToResource::convert)
                .orElseThrow(()->new RuntimeException(""));
    }

    public CategorieResource create(CategorieResource categorieResource){
        return categorieRepository.create(categorieResource)
                .map(categorieRecordToResource::convert)
                .orElseThrow(()->new RuntimeException(""));
    }

    public CategorieResource update(UUID id, CategorieResource categorieResource){
        return categorieRepository.update(id, categorieResource)
                .map(categorieRecordToResource::convert)
                .orElseThrow(()->new RuntimeException(""));
    }

}
