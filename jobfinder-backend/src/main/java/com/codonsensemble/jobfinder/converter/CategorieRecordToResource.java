package com.codonsensemble.jobfinder.converter;

import org.jooq.generated.tables.records.CategorieRecord;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Service;

import com.codonsensemble.jobfinder.model.CategorieResource;

@Service
public class CategorieRecordToResource implements Converter<CategorieRecord, CategorieResource> {
    @Override
    public CategorieResource convert(CategorieRecord categorieRecord) {
        return CategorieResource.builder()
                .id(categorieRecord.getId())
                .nom(categorieRecord.getNom())
                .build();
    }
}
