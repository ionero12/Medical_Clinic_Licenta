--------------------------------------------------------
--  File created - Thursday-March-21-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table SPECIALIZARI
--------------------------------------------------------

  CREATE TABLE "IONE"."SPECIALIZARI" 
   (	"ID_SPECIALIZARE" NUMBER, 
	"NUME_SPECIALIZARE" VARCHAR2(64 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table VALORI
--------------------------------------------------------

  CREATE TABLE "IONE"."VALORI" 
   (	"ID_VALOARE" NUMBER, 
	"NUME_VALOARE" VARCHAR2(32 BYTE), 
	"REZULTAT_VALOARE" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table PRETURI
--------------------------------------------------------

  CREATE TABLE "IONE"."PRETURI" 
   (	"ID_PRET" NUMBER, 
	"VALOARE" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table MEDICI
--------------------------------------------------------

  CREATE TABLE "IONE"."MEDICI" 
   (	"ID_MEDIC" NUMBER, 
	"NUME_MEDIC" VARCHAR2(64 BYTE), 
	"PRENUME_MEDIC" VARCHAR2(64 BYTE), 
	"DATA_NASTERE_MEDIC" DATE, 
	"CNP_MEDIC" VARCHAR2(16 BYTE), 
	"TELEFON_MEDIC" VARCHAR2(16 BYTE), 
	"EMAIL_MEDIC" VARCHAR2(128 BYTE), 
	"SPECIALIZARI_ID_SPECIALIZARE" NUMBER, 
	"PAROLA_MEDIC" VARCHAR2(64 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table FISE_MEDICALE
--------------------------------------------------------

  CREATE TABLE "IONE"."FISE_MEDICALE" 
   (	"ID_FISA_MEDICALA" NUMBER, 
	"DATA_INVESTIGATIE" DATE, 
	"DESCRIERE_INVESTIGATIE" VARCHAR2(512 BYTE), 
	"PACIENTI_ID_PACIENT" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table PACIENTI
--------------------------------------------------------

  CREATE TABLE "IONE"."PACIENTI" 
   (	"ID_PACIENT" NUMBER, 
	"NUME_PACIENT" VARCHAR2(64 BYTE), 
	"PRENUME_PACIENT" VARCHAR2(64 BYTE), 
	"DATA_NASTERE_PACIENT" DATE, 
	"CNP_PACIENT" VARCHAR2(16 BYTE), 
	"SEX_PACIENT" VARCHAR2(16 BYTE), 
	"GREUTATE_PACIENT" NUMBER(5,2), 
	"INALTIME_PACIENT" NUMBER(5,2), 
	"ASIGURAT" CHAR(1 BYTE), 
	"TELEFON_PACIENT" VARCHAR2(16 BYTE), 
	"EMAIL_PACIENT" VARCHAR2(128 BYTE), 
	"ABONAMENT_PACIENT" CHAR(1 BYTE), 
	"PAROLA_PACIENT" VARCHAR2(64 BYTE), 
	"VARSTA_PACIENT" NUMBER(3,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table CONSULTATII_PRETURI
--------------------------------------------------------

  CREATE TABLE "IONE"."CONSULTATII_PRETURI" 
   (	"CONSULTATII_ID_CONSULTATIE" NUMBER, 
	"PRETURI_ID_PRET" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table CONSULTATII
--------------------------------------------------------

  CREATE TABLE "IONE"."CONSULTATII" 
   (	"ID_CONSULTATIE" NUMBER, 
	"DATA_CONSULTATIEI" DATE, 
	"PACIENTI_ID_PACIENT" NUMBER, 
	"MEDICI_ID_MEDIC" NUMBER, 
	"NUME_CONSULTATIE" VARCHAR2(64 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table ANALIZE_VALORI
--------------------------------------------------------

  CREATE TABLE "IONE"."ANALIZE_VALORI" 
   (	"ANALIZE_ID_ANALIZA" NUMBER, 
	"VALORI_ID_VALOARE" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table ANALIZE
--------------------------------------------------------

  CREATE TABLE "IONE"."ANALIZE" 
   (	"ID_ANALIZA" NUMBER, 
	"DATA_ANALIZA" DATE, 
	"PACIENTI_ID_PACIENT" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into IONE.SPECIALIZARI
SET DEFINE OFF;
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (43,'Ginecologie');
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (44,'Neurologie');
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (45,'Ortopedie');
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (46,'Oncologie');
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (41,'Cardiologie');
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (42,'Oftalmologie');
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (47,'Psihiatrie');
Insert into IONE.SPECIALIZARI (ID_SPECIALIZARE,NUME_SPECIALIZARE) values (48,'Urologie');
REM INSERTING into IONE.VALORI
SET DEFINE OFF;
Insert into IONE.VALORI (ID_VALOARE,NUME_VALOARE,REZULTAT_VALOARE) values (44,'Glicemie',30);
REM INSERTING into IONE.PRETURI
SET DEFINE OFF;
Insert into IONE.PRETURI (ID_PRET,VALOARE) values (47,150);
Insert into IONE.PRETURI (ID_PRET,VALOARE) values (45,200);
Insert into IONE.PRETURI (ID_PRET,VALOARE) values (46,120);
REM INSERTING into IONE.MEDICI
SET DEFINE OFF;
Insert into IONE.MEDICI (ID_MEDIC,NUME_MEDIC,PRENUME_MEDIC,DATA_NASTERE_MEDIC,CNP_MEDIC,TELEFON_MEDIC,EMAIL_MEDIC,SPECIALIZARI_ID_SPECIALIZARE,PAROLA_MEDIC) values (61,'Vornicu','Andrei',to_date('22-JUN-95','DD-MON-RR'),'1950622097621','0639485716','vornicu@gmail.com',43,'$2a$10$9ya/8jY4yhVo6ZEZaIBpKe0unFfjmvsVJ1MGtnVEDn/x2sTBveG6K');
Insert into IONE.MEDICI (ID_MEDIC,NUME_MEDIC,PRENUME_MEDIC,DATA_NASTERE_MEDIC,CNP_MEDIC,TELEFON_MEDIC,EMAIL_MEDIC,SPECIALIZARI_ID_SPECIALIZARE,PAROLA_MEDIC) values (41,'Adam','Claudiu',to_date('10-JUN-02','DD-MON-RR'),'59012094750233','0792648397','adamc@gmail.com',41,'$2a$10$pzXfXsC1ZRqwt0HqCoUmcuGXcJmilLYflSrKFhVfGGrrkBpSIsOuq');
Insert into IONE.MEDICI (ID_MEDIC,NUME_MEDIC,PRENUME_MEDIC,DATA_NASTERE_MEDIC,CNP_MEDIC,TELEFON_MEDIC,EMAIL_MEDIC,SPECIALIZARI_ID_SPECIALIZARE,PAROLA_MEDIC) values (43,'Vasilescu','Mihai',to_date('03-MAY-00','DD-MON-RR'),'5000305016280','0938495678','mihaiv@gmail.com',41,'$2a$10$TdVsZP82ZtxY77NH0bO6jOUEFu4xyPEy/IMyyX.qR0tiD1Hd4BGKi');
REM INSERTING into IONE.FISE_MEDICALE
SET DEFINE OFF;
Insert into IONE.FISE_MEDICALE (ID_FISA_MEDICALA,DATA_INVESTIGATIE,DESCRIERE_INVESTIGATIE,PACIENTI_ID_PACIENT) values (41,to_date('03-MAR-24','DD-MON-RR'),'Pacientul prezinta simptome de diabet.',45);
REM INSERTING into IONE.PACIENTI
SET DEFINE OFF;
Insert into IONE.PACIENTI (ID_PACIENT,NUME_PACIENT,PRENUME_PACIENT,DATA_NASTERE_PACIENT,CNP_PACIENT,SEX_PACIENT,GREUTATE_PACIENT,INALTIME_PACIENT,ASIGURAT,TELEFON_PACIENT,EMAIL_PACIENT,ABONAMENT_PACIENT,PAROLA_PACIENT,VARSTA_PACIENT) values (71,'Virgil','Ion',to_date('08-JUN-90','DD-MON-RR'),'1900608098206','Masculin',76,174,'Y','0784958204','virgil@gmail.com','N','$2a$10$j2akbv6TzxRARJPMjonOku3kdmF5USqdJQ8GPDsEdjSYfUf9E6DTm',32);
Insert into IONE.PACIENTI (ID_PACIENT,NUME_PACIENT,PRENUME_PACIENT,DATA_NASTERE_PACIENT,CNP_PACIENT,SEX_PACIENT,GREUTATE_PACIENT,INALTIME_PACIENT,ASIGURAT,TELEFON_PACIENT,EMAIL_PACIENT,ABONAMENT_PACIENT,PAROLA_PACIENT,VARSTA_PACIENT) values (72,'Dobre','Stela',to_date('14-FEB-94','DD-MON-RR'),'2940214044565','feminin',54,160,'Y','063984831`','dobre@gmail.com','Y','$2a$10$hrvFsjp7SmBGi.QodzZCLO6tBj/WqprkMjK8WXm0a4s3sCe0XlFeK',29);
Insert into IONE.PACIENTI (ID_PACIENT,NUME_PACIENT,PRENUME_PACIENT,DATA_NASTERE_PACIENT,CNP_PACIENT,SEX_PACIENT,GREUTATE_PACIENT,INALTIME_PACIENT,ASIGURAT,TELEFON_PACIENT,EMAIL_PACIENT,ABONAMENT_PACIENT,PAROLA_PACIENT,VARSTA_PACIENT) values (45,'Farcas','Luiza',to_date('07-MAR-03','DD-MON-RR'),'6030703440041','Feminim',75,180.3,'Y','0730975268','farcas@gmail.com','Y','$2a$10$KwQ4x.drbfWPntHuad0yD.Hw/usbGD4HGfA4/NV.nJvdAJVZuTVPO',21);
Insert into IONE.PACIENTI (ID_PACIENT,NUME_PACIENT,PRENUME_PACIENT,DATA_NASTERE_PACIENT,CNP_PACIENT,SEX_PACIENT,GREUTATE_PACIENT,INALTIME_PACIENT,ASIGURAT,TELEFON_PACIENT,EMAIL_PACIENT,ABONAMENT_PACIENT,PAROLA_PACIENT,VARSTA_PACIENT) values (46,'Vatamanu','Mihai',to_date('06-APR-01','DD-MON-RR'),'5010604317522','Masculin',90.5,188.5,'Y','0792847501','vatamanu@gmail.com','Y','$2a$10$wm7ysC5KJ7xVci2VTBvhCeIf5c9T3xNHSAnaJBWkCGhVhN.X9GUKO',23);
REM INSERTING into IONE.CONSULTATII_PRETURI
SET DEFINE OFF;
Insert into IONE.CONSULTATII_PRETURI (CONSULTATII_ID_CONSULTATIE,PRETURI_ID_PRET) values (47,47);
REM INSERTING into IONE.CONSULTATII
SET DEFINE OFF;
Insert into IONE.CONSULTATII (ID_CONSULTATIE,DATA_CONSULTATIEI,PACIENTI_ID_PACIENT,MEDICI_ID_MEDIC,NUME_CONSULTATIE) values (47,to_date('05-MAY-24','DD-MON-RR'),45,61,'Consultatie Ginecologie');
REM INSERTING into IONE.ANALIZE_VALORI
SET DEFINE OFF;
Insert into IONE.ANALIZE_VALORI (ANALIZE_ID_ANALIZA,VALORI_ID_VALOARE) values (43,44);
REM INSERTING into IONE.ANALIZE
SET DEFINE OFF;
Insert into IONE.ANALIZE (ID_ANALIZA,DATA_ANALIZA,PACIENTI_ID_PACIENT) values (43,to_date('16-SEP-24','DD-MON-RR'),45);
--------------------------------------------------------
--  DDL for Index SPECIALIZARI_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."SPECIALIZARI_PK" ON "IONE"."SPECIALIZARI" ("ID_SPECIALIZARE") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index VALORI_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."VALORI_PK" ON "IONE"."VALORI" ("ID_VALOARE") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index PRETURI_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."PRETURI_PK" ON "IONE"."PRETURI" ("ID_PRET") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index MEDICI_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."MEDICI_PK" ON "IONE"."MEDICI" ("ID_MEDIC") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index MEDICI_EMAIL_MEDIC_UN
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."MEDICI_EMAIL_MEDIC_UN" ON "IONE"."MEDICI" ("EMAIL_MEDIC") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index FISE_MEDICALE__IDX
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."FISE_MEDICALE__IDX" ON "IONE"."FISE_MEDICALE" ("PACIENTI_ID_PACIENT") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index FISE_MEDICALE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."FISE_MEDICALE_PK" ON "IONE"."FISE_MEDICALE" ("ID_FISA_MEDICALA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index PACIENTI_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."PACIENTI_PK" ON "IONE"."PACIENTI" ("ID_PACIENT") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index PACIENTI_EMAIL_PACIENT_UN
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."PACIENTI_EMAIL_PACIENT_UN" ON "IONE"."PACIENTI" ("EMAIL_PACIENT") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index CONSULTATII_PRETURI_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."CONSULTATII_PRETURI_PK" ON "IONE"."CONSULTATII_PRETURI" ("CONSULTATII_ID_CONSULTATIE", "PRETURI_ID_PRET") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index CONSULTATII_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."CONSULTATII_PK" ON "IONE"."CONSULTATII" ("ID_CONSULTATIE") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index ANALIZE_VALORI_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."ANALIZE_VALORI_PK" ON "IONE"."ANALIZE_VALORI" ("ANALIZE_ID_ANALIZA", "VALORI_ID_VALOARE") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index ANALIZE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "IONE"."ANALIZE_PK" ON "IONE"."ANALIZE" ("ID_ANALIZA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table SPECIALIZARI
--------------------------------------------------------

  ALTER TABLE "IONE"."SPECIALIZARI" ADD CONSTRAINT "SPECIALIZARI_PK" PRIMARY KEY ("ID_SPECIALIZARE")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."SPECIALIZARI" MODIFY ("NUME_SPECIALIZARE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."SPECIALIZARI" MODIFY ("ID_SPECIALIZARE" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table VALORI
--------------------------------------------------------

  ALTER TABLE "IONE"."VALORI" ADD CONSTRAINT "VALORI_PK" PRIMARY KEY ("ID_VALOARE")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."VALORI" MODIFY ("REZULTAT_VALOARE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."VALORI" MODIFY ("NUME_VALOARE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."VALORI" MODIFY ("ID_VALOARE" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table PRETURI
--------------------------------------------------------

  ALTER TABLE "IONE"."PRETURI" ADD CONSTRAINT "PRETURI_PK" PRIMARY KEY ("ID_PRET")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."PRETURI" MODIFY ("VALOARE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PRETURI" MODIFY ("ID_PRET" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table MEDICI
--------------------------------------------------------

  ALTER TABLE "IONE"."MEDICI" ADD CONSTRAINT "MEDICI_EMAIL_MEDIC_UN" UNIQUE ("EMAIL_MEDIC")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."MEDICI" ADD CONSTRAINT "MEDICI_PK" PRIMARY KEY ("ID_MEDIC")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."MEDICI" MODIFY ("PAROLA_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("SPECIALIZARI_ID_SPECIALIZARE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("EMAIL_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("TELEFON_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("CNP_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("DATA_NASTERE_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("PRENUME_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("NUME_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."MEDICI" MODIFY ("ID_MEDIC" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table FISE_MEDICALE
--------------------------------------------------------

  ALTER TABLE "IONE"."FISE_MEDICALE" ADD CONSTRAINT "FISE_MEDICALE_PK" PRIMARY KEY ("ID_FISA_MEDICALA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."FISE_MEDICALE" MODIFY ("PACIENTI_ID_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."FISE_MEDICALE" MODIFY ("DESCRIERE_INVESTIGATIE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."FISE_MEDICALE" MODIFY ("DATA_INVESTIGATIE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."FISE_MEDICALE" MODIFY ("ID_FISA_MEDICALA" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table PACIENTI
--------------------------------------------------------

  ALTER TABLE "IONE"."PACIENTI" MODIFY ("VARSTA_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("EMAIL_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("PAROLA_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" ADD CONSTRAINT "PACIENTI_EMAIL_PACIENT_UN" UNIQUE ("EMAIL_PACIENT")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."PACIENTI" ADD CONSTRAINT "PACIENTI_PK" PRIMARY KEY ("ID_PACIENT")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."PACIENTI" ADD CONSTRAINT "ONLY_Y_N_2" CHECK ( abonament_pacient IN ( 'N', 'Y' ) ) ENABLE;
  ALTER TABLE "IONE"."PACIENTI" ADD CONSTRAINT "ONLY_Y_N" CHECK ( asigurat IN ( 'N', 'Y' ) ) ENABLE;
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("ABONAMENT_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("TELEFON_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("ASIGURAT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("INALTIME_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("GREUTATE_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("SEX_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("CNP_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("DATA_NASTERE_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("PRENUME_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("NUME_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."PACIENTI" MODIFY ("ID_PACIENT" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table CONSULTATII_PRETURI
--------------------------------------------------------

  ALTER TABLE "IONE"."CONSULTATII_PRETURI" ADD CONSTRAINT "CONSULTATII_PRETURI_PK" PRIMARY KEY ("CONSULTATII_ID_CONSULTATIE", "PRETURI_ID_PRET")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."CONSULTATII_PRETURI" MODIFY ("PRETURI_ID_PRET" NOT NULL ENABLE);
  ALTER TABLE "IONE"."CONSULTATII_PRETURI" MODIFY ("CONSULTATII_ID_CONSULTATIE" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table CONSULTATII
--------------------------------------------------------

  ALTER TABLE "IONE"."CONSULTATII" ADD CONSTRAINT "CONSULTATII_PK" PRIMARY KEY ("ID_CONSULTATIE")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."CONSULTATII" MODIFY ("NUME_CONSULTATIE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."CONSULTATII" MODIFY ("MEDICI_ID_MEDIC" NOT NULL ENABLE);
  ALTER TABLE "IONE"."CONSULTATII" MODIFY ("PACIENTI_ID_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."CONSULTATII" MODIFY ("DATA_CONSULTATIEI" NOT NULL ENABLE);
  ALTER TABLE "IONE"."CONSULTATII" MODIFY ("ID_CONSULTATIE" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table ANALIZE_VALORI
--------------------------------------------------------

  ALTER TABLE "IONE"."ANALIZE_VALORI" ADD CONSTRAINT "ANALIZE_VALORI_PK" PRIMARY KEY ("ANALIZE_ID_ANALIZA", "VALORI_ID_VALOARE")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."ANALIZE_VALORI" MODIFY ("VALORI_ID_VALOARE" NOT NULL ENABLE);
  ALTER TABLE "IONE"."ANALIZE_VALORI" MODIFY ("ANALIZE_ID_ANALIZA" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table ANALIZE
--------------------------------------------------------

  ALTER TABLE "IONE"."ANALIZE" ADD CONSTRAINT "ANALIZE_PK" PRIMARY KEY ("ID_ANALIZA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "IONE"."ANALIZE" MODIFY ("PACIENTI_ID_PACIENT" NOT NULL ENABLE);
  ALTER TABLE "IONE"."ANALIZE" MODIFY ("DATA_ANALIZA" NOT NULL ENABLE);
  ALTER TABLE "IONE"."ANALIZE" MODIFY ("ID_ANALIZA" NOT NULL ENABLE);
--------------------------------------------------------
--  Ref Constraints for Table MEDICI
--------------------------------------------------------

  ALTER TABLE "IONE"."MEDICI" ADD CONSTRAINT "MEDICI_SPECIALIZARI_FK" FOREIGN KEY ("SPECIALIZARI_ID_SPECIALIZARE")
	  REFERENCES "IONE"."SPECIALIZARI" ("ID_SPECIALIZARE") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table FISE_MEDICALE
--------------------------------------------------------

  ALTER TABLE "IONE"."FISE_MEDICALE" ADD CONSTRAINT "FISE_MEDICALE_PACIENTI_FK" FOREIGN KEY ("PACIENTI_ID_PACIENT")
	  REFERENCES "IONE"."PACIENTI" ("ID_PACIENT") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table CONSULTATII_PRETURI
--------------------------------------------------------

  ALTER TABLE "IONE"."CONSULTATII_PRETURI" ADD CONSTRAINT "CONSULTATII_PRETURI_PRETURI_FK" FOREIGN KEY ("PRETURI_ID_PRET")
	  REFERENCES "IONE"."PRETURI" ("ID_PRET") ENABLE;
  ALTER TABLE "IONE"."CONSULTATII_PRETURI" ADD CONSTRAINT "CONSULT_PRETURI_CONSULTATII_FK" FOREIGN KEY ("CONSULTATII_ID_CONSULTATIE")
	  REFERENCES "IONE"."CONSULTATII" ("ID_CONSULTATIE") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table CONSULTATII
--------------------------------------------------------

  ALTER TABLE "IONE"."CONSULTATII" ADD CONSTRAINT "CONSULTATII_MEDICI_FK" FOREIGN KEY ("MEDICI_ID_MEDIC")
	  REFERENCES "IONE"."MEDICI" ("ID_MEDIC") ENABLE;
  ALTER TABLE "IONE"."CONSULTATII" ADD CONSTRAINT "CONSULTATII_PACIENTI_FK" FOREIGN KEY ("PACIENTI_ID_PACIENT")
	  REFERENCES "IONE"."PACIENTI" ("ID_PACIENT") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table ANALIZE_VALORI
--------------------------------------------------------

  ALTER TABLE "IONE"."ANALIZE_VALORI" ADD CONSTRAINT "ANALIZE_VALORI_ANALIZE_FK" FOREIGN KEY ("ANALIZE_ID_ANALIZA")
	  REFERENCES "IONE"."ANALIZE" ("ID_ANALIZA") ENABLE;
  ALTER TABLE "IONE"."ANALIZE_VALORI" ADD CONSTRAINT "ANALIZE_VALORI_VALORI_FK" FOREIGN KEY ("VALORI_ID_VALOARE")
	  REFERENCES "IONE"."VALORI" ("ID_VALOARE") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table ANALIZE
--------------------------------------------------------

  ALTER TABLE "IONE"."ANALIZE" ADD CONSTRAINT "ANALIZE_PACIENTI_FK" FOREIGN KEY ("PACIENTI_ID_PACIENT")
	  REFERENCES "IONE"."PACIENTI" ("ID_PACIENT") ENABLE;
