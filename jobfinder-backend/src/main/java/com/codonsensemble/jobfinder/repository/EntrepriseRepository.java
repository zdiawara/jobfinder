package com.codonsensemble.jobfinder.repository;

import static org.jooq.generated.Tables.ENTREPRISE;

import java.util.Optional;
import java.util.UUID;

import org.jooq.DSLContext;
import org.jooq.Result;
import org.jooq.generated.tables.records.EntrepriseRecord;
import org.springframework.stereotype.Repository;

import com.codonsensemble.jobfinder.model.EntrepriseResource;

@Repository
public class EntrepriseRepository  {

    private final DSLContext dslContext;

    public EntrepriseRepository(DSLContext dslContext){
        this.dslContext = dslContext;
    }

    public Optional<EntrepriseRecord> findById(UUID id){
        return Optional.ofNullable(this.dslContext.selectFrom(ENTREPRISE)
                .where(ENTREPRISE.ID.eq(id))
                .fetchOne());
    }

    public Result<EntrepriseRecord> findAll(){
        return this.dslContext.selectFrom(ENTREPRISE)
                .fetch();
    }

    public Optional<EntrepriseRecord> create(EntrepriseResource entrepriseResource){
        return Optional.ofNullable(this.dslContext.insertInto(ENTREPRISE)
                .set(createRecord(entrepriseResource))
                .returning()
                .fetchOne());
    }

    public Optional<EntrepriseRecord> update(UUID id, EntrepriseResource entrepriseResource){
        this.dslContext.update(ENTREPRISE)
                .set(createRecord(entrepriseResource))
                .where(ENTREPRISE.ID.eq(id))
                .execute();
        return this.findById(id);
    }

    public static EntrepriseRecord createRecord(EntrepriseResource entrepriseResource){
        return new EntrepriseRecord()
                .setNom(entrepriseResource.getNom())
                .setDescription(entrepriseResource.getDescription());
    }
}
