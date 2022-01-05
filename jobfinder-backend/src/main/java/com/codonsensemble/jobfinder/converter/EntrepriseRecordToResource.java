package com.codonsensemble.jobfinder.converter;

import org.jooq.generated.tables.records.EntrepriseRecord;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Service;

import com.codonsensemble.jobfinder.model.EntrepriseResource;

@Service
public class EntrepriseRecordToResource implements Converter<EntrepriseRecord, EntrepriseResource> {
    @Override
    public EntrepriseResource convert(EntrepriseRecord entrepriseRecord) {
        return EntrepriseResource.builder()
                .id(entrepriseRecord.getId())
                .nom(entrepriseRecord.getNom())
                .description(entrepriseRecord.getDescription())
                .build();
    }
}
