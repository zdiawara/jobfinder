package com.codonsensemble.jobfinder.model;

import java.util.UUID;

import com.codonsensemble.jobfinder.helper.Constant;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JobFilter {
    @JsonProperty(value = "categorie.id")
    private UUID categorie;
    @JsonProperty(value = "entreprise.id")
    private UUID entreprise;
    private int size;
    private int page;
    private String search;

    public JobFilter(){
        size = Constant.PAGE_DEFAULT_SIZE;
        page = Constant.DEFAULT_PAGE;
    }
}
