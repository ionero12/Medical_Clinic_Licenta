-- Drop foreign key constraints first
ALTER TABLE analize_valori DROP CONSTRAINT analize_valori_valori_fk;
ALTER TABLE analize_valori DROP CONSTRAINT analize_valori_analize_fk;
ALTER TABLE analize DROP CONSTRAINT analize_pacienti_fk;

ALTER TABLE consultatii_preturi DROP CONSTRAINT consultatii_preturi_preturi_fk;
ALTER TABLE consultatii_preturi DROP CONSTRAINT consult_preturi_consultatii_fk;
ALTER TABLE consultatii DROP CONSTRAINT consultatii_medici_fk;
ALTER TABLE consultatii DROP CONSTRAINT consultatii_pacienti_fk;

ALTER TABLE fise_medicale DROP CONSTRAINT fise_medicale_pacienti_fk;

ALTER TABLE medici DROP CONSTRAINT medici_specializari_fk;
ALTER TABLE medici DROP CONSTRAINT medici_email_medic_un;

ALTER TABLE pacienti DROP CONSTRAINT pacienti_email_pacient_un;

-- Drop tables
DROP TABLE analize_valori;
DROP TABLE analize;
DROP TABLE consultatii_preturi;
DROP TABLE consultatii;
DROP TABLE fise_medicale;
DROP TABLE medici;
DROP TABLE pacienti;
DROP TABLE preturi;
DROP TABLE specializari;
DROP TABLE valori;

-- Drop sequences
DROP SEQUENCE PACIENT_SEQ;
DROP SEQUENCE SPECIALIZARE_SEQ;
DROP SEQUENCE MEDIC_SEQ;
DROP SEQUENCE ANALIZA_SEQ;
DROP SEQUENCE VALOARE_SEQ;
DROP SEQUENCE ANALIZA_VALOARE_SEQ;
DROP SEQUENCE CONSULTATIE_SEQ;
DROP SEQUENCE PRET_SEQ;
DROP SEQUENCE CONSULTATIE_PRET_SEQ;
DROP SEQUENCE FISA_MEDICALA_SEQ;




commit;

-- Create sequence for PACIENTI table
CREATE SEQUENCE PACIENT_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for SPECIALIZARI table
CREATE SEQUENCE SPECIALIZARE_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for MEDICI table
CREATE SEQUENCE MEDIC_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for ANALIZE table
CREATE SEQUENCE ANALIZA_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for VALORI table
CREATE SEQUENCE VALOARE_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for ANALIZE_VALORI table
CREATE SEQUENCE ANALIZA_VALOARE_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for CONSULTATII table
CREATE SEQUENCE CONSULTATIE_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for PRETURI table
CREATE SEQUENCE PRET_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for CONSULTATII_PRETURI table
CREATE SEQUENCE CONSULTATIE_PRET_SEQ START WITH 1 INCREMENT BY 1;

-- Create sequence for FISE_MEDICALE table
CREATE SEQUENCE FISA_MEDICALA_SEQ START WITH 1 INCREMENT BY 1;



-- Inserting data into PACIENTI table
INSERT INTO pacienti (id_pacient, nume_pacient, prenume_pacient, data_nastere_pacient, cnp_pacient, sex_pacient, greutate_pacient, inaltime_pacient, asigurat, telefon_pacient, email_pacient, abonament_pacient)
VALUES (PACIENT_SEQ.NEXTVAL, 'Dumitrescu', 'Vasile', TO_DATE('1990-01-15', 'YYYY-MM-DD'), '1234567890123456', 'Masculin', 75.5, 180.0, 'Y', '0765126543', 'john.doe@example.com', 'Y');
INSERT INTO pacienti (id_pacient, nume_pacient, prenume_pacient, data_nastere_pacient, cnp_pacient, sex_pacient, greutate_pacient, inaltime_pacient, asigurat, telefon_pacient, email_pacient, abonament_pacient)
VALUES (PACIENT_SEQ.NEXTVAL, 'Gabrilescu', 'Marian', TO_DATE('1996-07-18', 'YYYY-MM-DD'), '8463956729573', 'Masculin', 85.5, 170.0, 'Y', '0974375843', 'ludmi.doe@example.com', 'Y');

-- Inserting data into SPECIALIZARI table
INSERT INTO specializari (id_specializare, nume_specializare)
VALUES (SPECIALIZARE_SEQ.NEXTVAL, 'Cardiologie');
INSERT INTO specializari (id_specializare, nume_specializare)
VALUES (SPECIALIZARE_SEQ.NEXTVAL, 'Dermatologie');
INSERT INTO specializari (id_specializare, nume_specializare)
VALUES (SPECIALIZARE_SEQ.NEXTVAL, 'Neurochirurgie');

-- Inserting data into MEDICI table
INSERT INTO medici (id_medic, nume_medic, prenume_medic, data_nastere_medic, cnp_medic, telefon_medic, email_medic, parola_medic, specializari_id_specializare)
VALUES (MEDIC_SEQ.NEXTVAL, 'Radu', 'Mihai', TO_DATE('1975-08-10', 'YYYY-MM-DD'), '2148625048726', '0712764387', 'johnson.m@example.com', 'password1', 1);

INSERT INTO medici (id_medic, nume_medic, prenume_medic, data_nastere_medic, cnp_medic, telefon_medic, email_medic, parola_medic,specializari_id_specializare)
VALUES (MEDIC_SEQ.NEXTVAL, 'Zamfir', 'Emilia', TO_DATE('1980-03-25', 'YYYY-MM-DD'), '9043897623564', '0734873154', 'williams.e@example.com', 'password2', 2);

-- Inserting data into ANALIZE table
INSERT INTO analize (id_analiza, data_analiza, pacienti_id_pacient )
VALUES (ANALIZA_SEQ.NEXTVAL, TO_DATE('2023-01-05', 'YYYY-MM-DD'), 1);
INSERT INTO analize (id_analiza, data_analiza, pacienti_id_pacient)
VALUES (ANALIZA_SEQ.NEXTVAL, TO_DATE('2023-02-15', 'YYYY-MM-DD'), 2);

-- Inserting data into VALORI table
INSERT INTO valori (id_valoare, nume_valoare, rezultat_valoare)
VALUES (VALOARE_SEQ.NEXTVAL, 'Colesterol', 200);
INSERT INTO valori (id_valoare, nume_valoare, rezultat_valoare)
VALUES (VALOARE_SEQ.NEXTVAL, 'Glicemie', 120);

-- Inserting data into ANALIZE_VALORI table
INSERT INTO analize_valori (analize_id_analiza, valori_id_valoare)
VALUES (ANALIZA_VALOARE_SEQ.NEXTVAL, 1);
INSERT INTO analize_valori (analize_id_analiza, valori_id_valoare)
VALUES (ANALIZA_VALOARE_SEQ.NEXTVAL, 2);

-- Inserting data into CONSULTATII table
INSERT INTO consultatii (id_consultatie, data_consultatiei, pacienti_id_pacient, medici_id_medic, nume_consultatie)
VALUES (CONSULTATIE_SEQ.NEXTVAL, TO_DATE('2023-03-10', 'YYYY-MM-DD'), 1, 1, 'Consultatie Cardiologie');
INSERT INTO consultatii (id_consultatie, data_consultatiei, pacienti_id_pacient, medici_id_medic, nume_consultatie)
VALUES (CONSULTATIE_SEQ.NEXTVAL, TO_DATE('2023-04-20', 'YYYY-MM-DD'), 2, 2, 'Consultatie Dermatologie');

-- Inserting data into PRETURI table
INSERT INTO preturi (id_pret, valoare)
VALUES (PRET_SEQ.NEXTVAL, 100);
INSERT INTO preturi (id_pret, valoare)
VALUES (PRET_SEQ.NEXTVAL, 80);

-- Inserting data into CONSULTATII_PRETURI table
INSERT INTO consultatii_preturi (consultatii_id_consultatie, preturi_id_pret)
VALUES (CONSULTATIE_PRET_SEQ.NEXTVAL, 1);
INSERT INTO consultatii_preturi (consultatii_id_consultatie, preturi_id_pret)
VALUES (CONSULTATIE_PRET_SEQ.NEXTVAL, 2);

-- Inserting data into FISE_MEDICALE table
INSERT INTO fise_medicale (id_fisa_medicala, data_investigatie, descriere_investigatie, pacienti_id_pacient)
VALUES (FISA_MEDICALA_SEQ.NEXTVAL, TO_DATE('2023-01-10', 'YYYY-MM-DD'), 'Evaluare Cardiologie', 1);
INSERT INTO fise_medicale (id_fisa_medicala, data_investigatie, descriere_investigatie, pacienti_id_pacient)
VALUES (FISA_MEDICALA_SEQ.NEXTVAL, TO_DATE('2023-02-20', 'YYYY-MM-DD'), 'Evaluare Dermatologie', 2);

-- Commit the transaction
COMMIT;

