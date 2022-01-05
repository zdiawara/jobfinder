package com.codonsensemble.jobfinder.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class JobResource {
    private UUID id;
    private String titre;
    private String description;
    private String competence;
    private String lieu;
    private int salaireMin;
    private int salaireMax;

    @JsonProperty(value = "entrepriseId", access = JsonProperty.Access.WRITE_ONLY)
    private UUID entrepriseId;
    private EntrepriseResource entreprise;

    @JsonProperty(value = "categorieId", access = JsonProperty.Access.WRITE_ONLY)
    private UUID categorieId;
    private CategorieResource categorie;

}
