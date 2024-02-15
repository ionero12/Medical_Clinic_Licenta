package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "pacienti")
public class Pacient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pacient")
    private int idPacient;

    @Column(name = "nume_pacient", nullable = false)
    private String numePacient;

    @Column(name = "prenume_pacient", nullable = false)
    private String prenumePacient;

    @Column(name = "data_nastere_pacient", nullable = false)
    private Date dataNasterePacient;

    @Column(name = "cnp_pacient", nullable = false)
    private String cnpPacient;

    @Column(name = "sex_pacient", nullable = false)
    private String sexPacient;

    @Column(name = "greutate_pacient", nullable = false)
    private Double greutatePacient;

    @Column(name = "inaltime_pacient", nullable = false)
    private Double inaltimePacient;

    @Column(name = "asigurat", nullable = false)
    private char asigurat;

    @Column(name = "telefon_pacient", nullable = false)
    private String telefonPacient;

    @Column(name = "email_pacient")
    private String emailPacient;

    @Column(name = "abonament_pacient", nullable = false)
    private char abonamentPacient;

    public int getIdPacient() {
        return idPacient;
    }

    public void setIdPacient(int idPacient) {
        this.idPacient = idPacient;
    }

    public String getNumePacient() {
        return numePacient;
    }

    public void setNumePacient(String numePacient) {
        this.numePacient = numePacient;
    }

    public String getPrenumePacient() {
        return prenumePacient;
    }

    public void setPrenumePacient(String prenumePacient) {
        this.prenumePacient = prenumePacient;
    }

    public Date getDataNasterePacient() {
        return dataNasterePacient;
    }

    public void setDataNasterePacient(Date dataNasterePacient) {
        this.dataNasterePacient = dataNasterePacient;
    }

    public String getCnpPacient() {
        return cnpPacient;
    }

    public void setCnpPacient(String cnpPacient) {
        this.cnpPacient = cnpPacient;
    }

    public String getSexPacient() {
        return sexPacient;
    }

    public void setSexPacient(String sexPacient) {
        this.sexPacient = sexPacient;
    }

    public Double getGreutatePacient() {
        return greutatePacient;
    }

    public void setGreutatePacient(Double greutatePacient) {
        this.greutatePacient = greutatePacient;
    }

    public Double getInaltimePacient() {
        return inaltimePacient;
    }

    public void setInaltimePacient(Double inaltimePacient) {
        this.inaltimePacient = inaltimePacient;
    }

    public char getAsigurat() {
        return asigurat;
    }

    public void setAsigurat(char asigurat) {
        this.asigurat = asigurat;
    }

    public String getTelefonPacient() {
        return telefonPacient;
    }

    public void setTelefonPacient(String telefonPacient) {
        this.telefonPacient = telefonPacient;
    }

    public String getEmailPacient() {
        return emailPacient;
    }

    public void setEmailPacient(String emailPacient) {
        this.emailPacient = emailPacient;
    }

    public char getAbonamentPacient() {
        return abonamentPacient;
    }

    public void setAbonamentPacient(char abonamentPacient) {
        this.abonamentPacient = abonamentPacient;
    }
}
