package com.codonsensemble.jobfinder.repository;

import static org.jooq.generated.Tables.UTILISATEUR;

import java.util.Optional;

import org.jooq.DSLContext;
import org.jooq.generated.tables.records.UtilisateurRecord;
import org.springframework.stereotype.Repository;

@Repository
public class UtilisateurRepository {

    private final DSLContext dslContext;

    public UtilisateurRepository(DSLContext dslContext){
        this.dslContext = dslContext;
    }

    public UtilisateurRecord create(){
        var utilisateurRecord = new UtilisateurRecord()
                .setNom("Test")
                .setPrenom("Test");
        return this.dslContext.insertInto(UTILISATEUR)
                .set(utilisateurRecord)
                .returning()
                .fetchOne();
    }

    public Optional<UtilisateurRecord> findByEmail(String email){
        return dslContext.selectFrom(UTILISATEUR)
                .where(UTILISATEUR.EMAIL.eq(email))
                .fetchOptional();
    }
}
