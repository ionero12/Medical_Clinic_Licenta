--------------------------------------------------------
--  File created - Thursday-March-21-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table SPECIALIZARI
--------------------------------------------------------

CREATE TABLE "IONE"."SPECIALIZARI" (
    "ID_SPECIALIZARE"   NUMBER,
    "NUME_SPECIALIZARE" VARCHAR2(64 BYTE)
) 
--------------------------------------------------------
--  DDL for Table VALORI
--------------------------------------------------------

CREATE TABLE "IONE"."VALORI" (
    "ID_VALOARE"       NUMBER,
    "NUME_VALOARE"     VARCHAR2(32 BYTE),
    "REZULTAT_VALOARE" NUMBER
)
--------------------------------------------------------
--  DDL for Table PRETURI
--------------------------------------------------------

CREATE TABLE "IONE"."PRETURI" (
    "ID_PRET"             NUMBER,
    "PRET_FARA_ABONAMENT" NUMBER,
    "PRET_CU_ABONAMENT"   NUMBER
) 
--------------------------------------------------------
--  DDL for Table MEDICI
--------------------------------------------------------

CREATE TABLE "IONE"."MEDICI" (
    "ID_MEDIC"                     NUMBER,
    "NUME_MEDIC"                   VARCHAR2(64 BYTE),
    "PRENUME_MEDIC"                VARCHAR2(64 BYTE),
    "DATA_NASTERE_MEDIC"           DATE,
    "CNP_MEDIC"                    VARCHAR2(16 BYTE),
    "TELEFON_MEDIC"                VARCHAR2(16 BYTE),
    "EMAIL_MEDIC"                  VARCHAR2(128 BYTE),
    "SPECIALIZARI_ID_SPECIALIZARE" NUMBER,
    "PAROLA_MEDIC"                 VARCHAR2(64 BYTE),
    "EXPERIENTA"                     NUMBER,
    "UNIVERSITATE"                    VARCHAR2(128 BYTE)
) 
--------------------------------------------------------
--  DDL for Table DIAGNOSTIC
--------------------------------------------------------

CREATE TABLE "IONE"."DIAGNOSTICE" (
    "ID_DIAGNOSTIC"        NUMBER,
    "DATA_DIAGNOSTIC"      DATE,
    "DESCRIERE_DIAGNOSTIC" VARCHAR2(512 BYTE),
    "NUME_DIAGNOSTIC"      VARCHAR2(64 BYTE),
    "PACIENTI_ID_PACIENT"  NUMBER
) 
--------------------------------------------------------
--  DDL for Table PACIENTI
--------------------------------------------------------

CREATE TABLE "IONE"."PACIENTI" (
    "ID_PACIENT"           NUMBER,
    "NUME_PACIENT"         VARCHAR2(64 BYTE),
    "PRENUME_PACIENT"      VARCHAR2(64 BYTE),
    "DATA_NASTERE_PACIENT" DATE,
    "CNP_PACIENT"          VARCHAR2(16 BYTE),
    "SEX_PACIENT"          VARCHAR2(16 BYTE),
    "GREUTATE_PACIENT"     NUMBER(5, 2),
    "INALTIME_PACIENT"     NUMBER(5, 2),
    "ASIGURAT"             CHAR(1 BYTE),
    "TELEFON_PACIENT"      VARCHAR2(16 BYTE),
    "EMAIL_PACIENT"        VARCHAR2(128 BYTE),
    "ABONAMENT_PACIENT"    CHAR(1 BYTE),
    "PAROLA_PACIENT"       VARCHAR2(64 BYTE),
    "VARSTA_PACIENT"       NUMBER(3, 0)
) 
--------------------------------------------------------
--  DDL for Table CONSULTATII
--------------------------------------------------------

CREATE TABLE "IONE"."CONSULTATII" (
    "ID_CONSULTATIE"      NUMBER,
    "DATA_CONSULTATIEI"   DATE,
    "PACIENTI_ID_PACIENT" NUMBER,
    "MEDICI_ID_MEDIC"     NUMBER,
    "PRETURI_ID_PRET"     NUMBER,
    "NUME_CONSULTATIE"    VARCHAR2(64 BYTE),
    "RATING"                          NUMBER,
    "FEEDBACK"                       VARCHAR2(256 BYTE)
) 
   
--------------------------------------------------------
--  DDL for Table ANALIZE_VALORI
--------------------------------------------------------

CREATE TABLE "IONE"."ANALIZE_VALORI" (
    "ANALIZE_ID_ANALIZA" NUMBER,
    "VALORI_ID_VALOARE"  NUMBER
) 
--------------------------------------------------------
--  DDL for Table ANALIZE
--------------------------------------------------------

CREATE TABLE "IONE"."ANALIZE" (
    "ID_ANALIZA"          NUMBER,
    "DATA_ANALIZA"        DATE,
    "PACIENTI_ID_PACIENT" NUMBER
) 
  --------------------------------------------------------
--  DDL for Table BOLI
--------------------------------------------------------

CREATE TABLE "IONE"."BOLI" (
    "ID_BOALA"              NUMBER,
    "NUME_BOALA"        VARCHAR2(64 BYTE),
    "DESCRIERE_BOALA"      VARCHAR2(1024 BYTE)
)

--------------------------------------------------------
--  DDL for Index SPECIALIZARI_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."SPECIALIZARI_PK" ON
    "IONE"."SPECIALIZARI" (
        "ID_SPECIALIZARE"
    ) 
 
--------------------------------------------------------
--  DDL for Index VALORI_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."VALORI_PK" ON
    "IONE"."VALORI" (
        "ID_VALOARE"
    ) 
  
--------------------------------------------------------
--  DDL for Index PRETURI_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."PRETURI_PK" ON
    "IONE"."PRETURI" (
        "ID_PRET"
    ) 
 
--------------------------------------------------------
--  DDL for Index MEDICI_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."MEDICI_PK" ON
    "IONE"."MEDICI" (
        "ID_MEDIC"
    ) 

--------------------------------------------------------
--  DDL for Index MEDICI_EMAIL_MEDIC_UN
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."MEDICI_EMAIL_MEDIC_UN" ON
    "IONE"."MEDICI" (
        "EMAIL_MEDIC"
    ) 

--------------------------------------------------------
--  DDL for Index DIAGNOSTICE__IDX
--------------------------------------------------------
CREATE UNIQUE INDEX "IONE"."DIAGNOSTICE__IDX" ON
    "IONE"."DIAGNOSTICE" (
        "PACIENTI_ID_PACIENT"
    ) 
 
--------------------------------------------------------
--  DDL for Index DIAGNOSTICE_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."DIAGNOSTICE_PK" ON
    "IONE"."DIAGNOSTICE" (
        "ID_DIAGNOSTIC"
    ) 
  
--------------------------------------------------------
--  DDL for Index PACIENTI_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."PACIENTI_PK" ON
    "IONE"."PACIENTI" (
        "ID_PACIENT"
    ) 

--------------------------------------------------------
--  DDL for Index PACIENTI_EMAIL_PACIENT_UN
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."PACIENTI_EMAIL_PACIENT_UN" ON
    "IONE"."PACIENTI" (
        "EMAIL_PACIENT"
    ) 

--------------------------------------------------------
--  DDL for Index CONSULTATII_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."CONSULTATII_PK" ON
    "IONE"."CONSULTATII" (
        "ID_CONSULTATIE"
    ) 

--------------------------------------------------------
--  DDL for Index ANALIZE_VALORI_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."ANALIZE_VALORI_PK" ON
    "IONE"."ANALIZE_VALORI" (
        "ANALIZE_ID_ANALIZA",
        "VALORI_ID_VALOARE"
    ) 

--------------------------------------------------------
--  DDL for Index ANALIZE_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."ANALIZE_PK" ON
    "IONE"."ANALIZE" (
        "ID_ANALIZA"
    ) 

--------------------------------------------------------
--  DDL for Index BOLI_PK
--------------------------------------------------------

CREATE UNIQUE INDEX "IONE"."BOLI_PK" ON
    "IONE"."BOLI" (
        "ID_BOALA"
    )

--------------------------------------------------------
--  Constraints for Table SPECIALIZARI
--------------------------------------------------------

ALTER TABLE "IONE"."SPECIALIZARI" ADD CONSTRAINT "SPECIALIZARI_PK" PRIMARY KEY ( "ID_SPECIALIZARE" )

ALTER TABLE "IONE"."SPECIALIZARI" MODIFY (
    "NUME_SPECIALIZARE"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."SPECIALIZARI" MODIFY (
    "ID_SPECIALIZARE"
        NOT NULL ENABLE
);
--------------------------------------------------------
--  Constraints for Table VALORI
--------------------------------------------------------

ALTER TABLE "IONE"."VALORI" ADD CONSTRAINT "VALORI_PK" PRIMARY KEY ( "ID_VALOARE" )

ALTER TABLE "IONE"."VALORI" MODIFY (
    "REZULTAT_VALOARE"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."VALORI" MODIFY (
    "NUME_VALOARE"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."VALORI" MODIFY (
    "ID_VALOARE"
        NOT NULL ENABLE
);
--------------------------------------------------------
--  Constraints for Table PRETURI
--------------------------------------------------------

ALTER TABLE "IONE"."PRETURI" ADD CONSTRAINT "PRETURI_PK" PRIMARY KEY ( "ID_PRET" )

ALTER TABLE "IONE"."PRETURI" MODIFY (
    "PRET_FARA_ABONAMENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PRETURI" MODIFY (
    "PRET_CU_ABONAMENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PRETURI" MODIFY (
    "ID_PRET"
        NOT NULL ENABLE
);
--------------------------------------------------------
--  Constraints for Table MEDICI
--------------------------------------------------------

ALTER TABLE "IONE"."MEDICI" ADD CONSTRAINT "MEDICI_EMAIL_MEDIC_UN" UNIQUE ( "EMAIL_MEDIC" )

ALTER TABLE "IONE"."MEDICI" ADD CONSTRAINT "MEDICI_PK" PRIMARY KEY ( "ID_MEDIC" );

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "PAROLA_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "SPECIALIZARI_ID_SPECIALIZARE"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "EMAIL_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "TELEFON_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "CNP_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "DATA_NASTERE_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "PRENUME_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "NUME_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."MEDICI" MODIFY (
    "ID_MEDIC"
        NOT NULL ENABLE
);
--------------------------------------------------------
--  Constraints for Table DIAGNOSTICE
--------------------------------------------------------

ALTER TABLE "IONE"."DIAGNOSTICE" ADD CONSTRAINT "DIAGNOSTICE_PK" PRIMARY KEY ( "ID_DIAGNOSTIC" )

ALTER TABLE "IONE"."DIAGNOSTICE" MODIFY (
    "PACIENTI_ID_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."DIAGNOSTICE" MODIFY (
    "DATA_DIAGNOSTIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."DIAGNOSTICE" MODIFY (
    "ID_DIAGNOSTIC"
        NOT NULL ENABLE
);
--------------------------------------------------------
--  Constraints for Table PACIENTI
--------------------------------------------------------

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "VARSTA_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "EMAIL_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "PAROLA_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" ADD CONSTRAINT "PACIENTI_EMAIL_PACIENT_UN" UNIQUE ( "EMAIL_PACIENT" )

ALTER TABLE "IONE"."PACIENTI" ADD CONSTRAINT "PACIENTI_PK" PRIMARY KEY ( "ID_PACIENT" )

ALTER TABLE "IONE"."PACIENTI"
    ADD CONSTRAINT "ONLY_Y_N_2" CHECK ( abonament_pacient IN ( 'N', 'Y' ) ) ENABLE;

ALTER TABLE "IONE"."PACIENTI"
    ADD CONSTRAINT "ONLY_Y_N" CHECK ( asigurat IN ( 'N', 'Y' ) ) ENABLE;

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "ABONAMENT_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "TELEFON_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "ASIGURAT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "INALTIME_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "GREUTATE_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "SEX_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "CNP_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "DATA_NASTERE_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "PRENUME_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "NUME_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."PACIENTI" MODIFY (
    "ID_PACIENT"
        NOT NULL ENABLE
);

--------------------------------------------------------
--  Constraints for Table CONSULTATII
--------------------------------------------------------

ALTER TABLE "IONE"."CONSULTATII" ADD CONSTRAINT "CONSULTATII_PK" PRIMARY KEY ( "ID_CONSULTATIE" )

ALTER TABLE "IONE"."CONSULTATII" MODIFY (
    "NUME_CONSULTATIE"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."CONSULTATII" MODIFY (
    "MEDICI_ID_MEDIC"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."CONSULTATII" MODIFY (
    "PACIENTI_ID_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."CONSULTATII" MODIFY (
    "DATA_CONSULTATIEI"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."CONSULTATII" MODIFY (
    "ID_CONSULTATIE"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."CONSULTATII" MODIFY (
    "PRETURI_ID_PRET"
        NOT NULL ENABLE
);

--------------------------------------------------------
--  Constraints for Table ANALIZE_VALORI
--------------------------------------------------------

ALTER TABLE "IONE"."ANALIZE_VALORI" ADD CONSTRAINT "ANALIZE_VALORI_PK" PRIMARY KEY ( "ANALIZE_ID_ANALIZA",
                                                                                     "VALORI_ID_VALOARE" )

ALTER TABLE "IONE"."ANALIZE_VALORI" MODIFY (
    "VALORI_ID_VALOARE"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."ANALIZE_VALORI" MODIFY (
    "ANALIZE_ID_ANALIZA"
        NOT NULL ENABLE
);
--------------------------------------------------------
--  Constraints for Table ANALIZE
--------------------------------------------------------

ALTER TABLE "IONE"."ANALIZE" ADD CONSTRAINT "ANALIZE_PK" PRIMARY KEY ( "ID_ANALIZA" )

ALTER TABLE "IONE"."ANALIZE" MODIFY (
    "PACIENTI_ID_PACIENT"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."ANALIZE" MODIFY (
    "DATA_ANALIZA"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."ANALIZE" MODIFY (
    "ID_ANALIZA"
        NOT NULL ENABLE
);
--------------------------------------------------------
--  Constraints for Table BOLI
--------------------------------------------------------

ALTER TABLE "IONE"."BOLI" ADD CONSTRAINT "BOLI_PK" PRIMARY KEY ( "ID_BOALA" )

ALTER TABLE "IONE"."BOLI" MODIFY (
    "NUME_BOALA"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."BOLI" MODIFY (
    "DESCRIERE_BOALA"
        NOT NULL ENABLE
);

ALTER TABLE "IONE"."BOLI" MODIFY (
    "ID_BOALA"
        NOT NULL ENABLE
);

--------------------------------------------------------
--  Ref Constraints for Table MEDICI
--------------------------------------------------------

ALTER TABLE "IONE"."MEDICI"
    ADD CONSTRAINT "MEDICI_SPECIALIZARI_FK" FOREIGN KEY ( "SPECIALIZARI_ID_SPECIALIZARE" )
        REFERENCES "IONE"."SPECIALIZARI" ( "ID_SPECIALIZARE" )
    ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table DIAGNOSTICE
--------------------------------------------------------

ALTER TABLE "IONE"."DIAGNOSTICE"
    ADD CONSTRAINT "DIAGNOSTICE_PACIENTI_FK" FOREIGN KEY ( "PACIENTI_ID_PACIENT" )
        REFERENCES "IONE"."PACIENTI" ( "ID_PACIENT" )
    ENABLE;

--------------------------------------------------------
--  Ref Constraints for Table CONSULTATII
--------------------------------------------------------

ALTER TABLE "IONE"."CONSULTATII"
    ADD CONSTRAINT "CONSULTATII_MEDICI_FK" FOREIGN KEY ( "MEDICI_ID_MEDIC" )
        REFERENCES "IONE"."MEDICI" ( "ID_MEDIC" )
    ENABLE;

ALTER TABLE "IONE"."CONSULTATII"
    ADD CONSTRAINT "CONSULTATII_PACIENTI_FK" FOREIGN KEY ( "PACIENTI_ID_PACIENT" )
        REFERENCES "IONE"."PACIENTI" ( "ID_PACIENT" )
    ENABLE;

ALTER TABLE "IONE"."CONSULTATII"
    ADD CONSTRAINT "CONSULTATII_PRETURI_FK" FOREIGN KEY ( "PRETURI_ID_PRET" )
        REFERENCES "IONE"."PRETURI" ( "ID_PRET" )
    ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table ANALIZE_VALORI
--------------------------------------------------------

ALTER TABLE "IONE"."ANALIZE_VALORI"
    ADD CONSTRAINT "ANALIZE_VALORI_ANALIZE_FK" FOREIGN KEY ( "ANALIZE_ID_ANALIZA" )
        REFERENCES "IONE"."ANALIZE" ( "ID_ANALIZA" )
    ENABLE;

ALTER TABLE "IONE"."ANALIZE_VALORI"
    ADD CONSTRAINT "ANALIZE_VALORI_VALORI_FK" FOREIGN KEY ( "VALORI_ID_VALOARE" )
        REFERENCES "IONE"."VALORI" ( "ID_VALOARE" )
    ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table ANALIZE
--------------------------------------------------------

ALTER TABLE "IONE"."ANALIZE"
    ADD CONSTRAINT "ANALIZE_PACIENTI_FK" FOREIGN KEY ( "PACIENTI_ID_PACIENT" )
        REFERENCES "IONE"."PACIENTI" ( "ID_PACIENT" )
    ENABLE;
    
    
ALTER TABLE valori
ADD (valoare_min NUMBER,
     valoare_max NUMBER);

