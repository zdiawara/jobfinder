package com.codonsensemble.jobfinder.repository;

import static org.jooq.generated.Tables.CATEGORIE;
import static org.jooq.generated.Tables.ENTREPRISE;
import static org.jooq.generated.Tables.JOB;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.Record1;
import org.jooq.Result;
import org.jooq.SelectConditionStep;
import org.jooq.SelectSelectStep;
import org.jooq.generated.tables.records.JobRecord;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.codonsensemble.jobfinder.model.CategorieResource;
import com.codonsensemble.jobfinder.model.EntrepriseResource;
import com.codonsensemble.jobfinder.model.JobFilter;
import com.codonsensemble.jobfinder.model.JobResource;
import com.codonsensemble.jobfinder.model.ListResult;

@Repository
public class JobRepository {

    private final DSLContext dslContext;

    public JobRepository(DSLContext dslContext){
        this.dslContext = dslContext;
    }

    public Optional<JobResource> findById(UUID id){
        return this.dslContext.select()
                .from(JOB)
                .leftJoin(CATEGORIE).on(CATEGORIE.ID.eq(JOB.ID_CATEGORIE))
                .leftJoin(ENTREPRISE).on(ENTREPRISE.ID.eq(JOB.ID_ENTREPRISE))
                .where(JOB.ID.eq(id))
                .fetchOptional()
                .map(JobRepository::jobMapper);
    }

    public ListResult<JobResource> findAll(JobFilter jobFilter){

        int totalJobs = addFilters(dslContext.selectCount(), jobFilter)
                .fetchOptional()
                .map(Record1::value1)
                .orElse(0);

        Result<Record> jobsRecord = addFilters(dslContext.select(), jobFilter)
                .orderBy(JOB.TITRE.asc())
                .offset((jobFilter.getPage() - 1) * jobFilter.getSize())
                .limit(jobFilter.getSize())
                .fetch();

        return ListResult
                .<JobResource>builder()
                .total(totalJobs)
                .page(jobFilter.getPage())
                .data(jobsRecord.stream()
                        .map(JobRepository::jobMapper)
                        .collect(Collectors.toList()))
                .build();
    }

    private static JobResource jobMapper(Record record){
        return record.into(JOB).into(JobResource.class)
                .toBuilder()
                .categorie(record.into(CATEGORIE).into(CategorieResource.class))
                .entreprise(record.into(ENTREPRISE).into(EntrepriseResource.class))
                .build();
    }

    private <R extends Record> SelectConditionStep<R> addFilters(SelectSelectStep<R> selectSelectStep, JobFilter jobFilter){
        var select = selectSelectStep.from(JOB)
                .leftJoin(CATEGORIE).on(CATEGORIE.ID.eq(JOB.ID_CATEGORIE))
                .leftJoin(ENTREPRISE).on(ENTREPRISE.ID.eq(JOB.ID_ENTREPRISE));
        return select.where(computeConditions(jobFilter));
    }

    private static List<Condition> computeConditions(JobFilter jobFilter){
        List<Condition> conditions = new ArrayList<>();

        if(Objects.nonNull(jobFilter.getCategorie())){
            conditions.add(JOB.ID_CATEGORIE.eq(jobFilter.getCategorie()));
        }

        if(Objects.nonNull(jobFilter.getCategorie())){
            conditions.add(JOB.ID_CATEGORIE.eq(jobFilter.getCategorie()));
        }

        if(StringUtils.hasText(jobFilter.getSearch())){
            final String search = "%"+jobFilter.getSearch()+"%";
            conditions.add(JOB.TITRE.likeIgnoreCase(search)
                    .or(JOB.DESCRIPTION.likeIgnoreCase(search))
                    .or(JOB.COMPETENCE.likeIgnoreCase(search)));
        }

        return conditions;
    }

    public Optional<JobRecord> create(JobResource jobResource){
        return this.dslContext.insertInto(JOB)
                .set(createRecord(jobResource))
                .returning()
                .fetchOptional();
    }

    public Optional<JobResource> update(UUID id, JobResource jobResource){
        this.dslContext.update(JOB)
                .set(createRecord(jobResource))
                .where(JOB.ID.eq(id))
                .execute();
        return this.findById(id);
    }

    public static JobRecord createRecord(JobResource jobResource){
        return new JobRecord()
                .setTitre(jobResource.getTitre())
                .setDescription(jobResource.getDescription())
                .setCompetence(jobResource.getCompetence())
                .setLieu(jobResource.getLieu())
                .setSalaireMin(jobResource.getSalaireMin())
                .setSalaireMax(jobResource.getSalaireMax())
                .setIdEntreprise(jobResource.getEntrepriseId())
                .setIdCategorie(jobResource.getCategorieId());
    }
}
