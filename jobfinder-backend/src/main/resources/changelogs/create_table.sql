-- liquibase formatted sql
-- changeset zakaridia:create_table

CREATE TABLE utilisateur(
    id                UUID DEFAULT gen_random_uuid() NOT NULL,
    nom               VARCHAR(256),
    prenom            VARCHAR(256),
    date_creation     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    date_modification TIMESTAMP WITH TIME ZONE,

    CONSTRAINT "utilisateur_pk" PRIMARY KEY ("id")
);

CREATE TABLE entreprise(
    id          UUID DEFAULT gen_random_uuid() NOT NULL,
    nom         VARCHAR(50) NOT NULL,
    description TEXT,
    CONSTRAINT "entreprise_pk" PRIMARY KEY ("id")
);

CREATE TABLE categorie(
    id          UUID DEFAULT gen_random_uuid() NOT NULL,
    nom         VARCHAR(50) NOT NULL,

    CONSTRAINT "categorie_pk" PRIMARY KEY ("id")
);

CREATE TABLE job(
    id                UUID DEFAULT gen_random_uuid() NOT NULL,
    titre             VARCHAR(256) NOT NULL,
    salaire_min       INT NOT NULL,
    salaire_max       INT,
    lieu              VARCHAR(30) NOT NULL,
    description       TEXT NOT NULL,
    competence        TEXT,
    id_entreprise     UUID NOT NULL,
    id_categorie      UUID NOT NULL,
    date_creation     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    date_modification TIMESTAMP WITH TIME ZONE,

    CONSTRAINT "job_pk" PRIMARY KEY ("id"),

    CONSTRAINT "entreprise_fk" FOREIGN KEY ("id_entreprise")
        REFERENCES entreprise ("id"),

    CONSTRAINT "categorie_fk" FOREIGN KEY ("id_categorie")
        REFERENCES categorie ("id")
);

CREATE TYPE EtatDemande AS ENUM ('sended','received','accepted','refused');

CREATE TABLE demande(
    id_utilisateur    UUID NOT NULL,
    id_job            UUID NOT NULL,
    etat              EtatDemande NOT NULL default 'sended',
    date_creation     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    date_modification TIMESTAMP WITH TIME ZONE,

    CONSTRAINT "demande_pk" PRIMARY KEY("id_utilisateur" , "id_job"),

    CONSTRAINT "demande_utilisateur_fk" FOREIGN KEY ("id_utilisateur")
        REFERENCES utilisateur("id"),

    CONSTRAINT "demande_job_fk" FOREIGN KEY ("id_job")
        REFERENCES job("id")
);

CREATE TABLE favori(
     id_utilisateur    UUID NOT NULL,
     id_job            UUID NOT NULL,
     date_creation     TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

     CONSTRAINT "favori_pk" PRIMARY KEY("id_utilisateur" , "id_job"),

     CONSTRAINT "favori_utilisateur_fk" FOREIGN KEY ("id_utilisateur")
         REFERENCES utilisateur("id"),

     CONSTRAINT "favori_job_fk" FOREIGN KEY ("id_job")
         REFERENCES job("id")
);

--rollback DROP TABLE IF EXISTS demande;
--rollback DROP TABLE IF EXISTS favori;
--rollback DROP TABLE IF EXISTS job;
--rollback DROP TABLE IF EXISTS categorie;
--rollback DROP TABLE IF EXISTS entreprise;
--rollback DROP TABLE IF EXISTS utilisateur;
--rollback DROP TYPE IF EXISTS EtatDemande;