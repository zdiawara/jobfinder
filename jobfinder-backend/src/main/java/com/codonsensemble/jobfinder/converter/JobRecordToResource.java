package com.codonsensemble.jobfinder.converter;

import org.jooq.generated.tables.records.JobRecord;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Service;

import com.codonsensemble.jobfinder.model.JobResource;

@Service
public class JobRecordToResource implements Converter<JobRecord, JobResource> {
    @Override
    public JobResource convert(JobRecord jobRecord) {
        return JobResource.builder()
                .id(jobRecord.getId())
                .titre(jobRecord.getTitre())
                .description(jobRecord.getDescription())
                .lieu(jobRecord.getLieu())
                .competence(jobRecord.getCompetence())
                .salaireMin(jobRecord.getSalaireMin())
                .salaireMax(jobRecord.getSalaireMax())
                .build();
    }
}
