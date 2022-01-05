package com.codonsensemble.jobfinder.repository;

import static org.jooq.generated.Tables.CATEGORIE;

import java.util.Optional;
import java.util.UUID;

import org.jooq.DSLContext;
import org.jooq.Result;
import org.jooq.generated.tables.records.CategorieRecord;
import org.springframework.stereotype.Repository;

import com.codonsensemble.jobfinder.model.CategorieResource;

@Repository
public class CategorieRepository {

    private final DSLContext dslContext;

    public CategorieRepository(DSLContext dslContext){
        this.dslContext = dslContext;
    }

    public Optional<CategorieRecord> findById(UUID id){
        return Optional.ofNullable(this.dslContext.selectFrom(CATEGORIE)
                .where(CATEGORIE.ID.eq(id))
                .fetchOne());
    }

    public Result<CategorieRecord> findAll(){
        return this.dslContext.selectFrom(CATEGORIE)
                .fetch();
    }

    public Optional<CategorieRecord> create(CategorieResource categorieResource){
        return Optional.ofNullable(this.dslContext.insertInto(CATEGORIE)
                .set(createRecord(categorieResource))
                .returning()
                .fetchOne());
    }

    public Optional<CategorieRecord> update(UUID id, CategorieResource categorieResource){
        this.dslContext.update(CATEGORIE)
                .set(createRecord(categorieResource))
                .where(CATEGORIE.ID.eq(id))
                .execute();
        return this.findById(id);
    }

    public static CategorieRecord createRecord(CategorieResource categorieResource){
        return new CategorieRecord()
                .setNom(categorieResource.getNom());
    }
}
