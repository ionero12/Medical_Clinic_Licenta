package com.example.medical_clinic_project.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pacienti")
public class Pacient {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PACIENT_SEQ")
    @SequenceGenerator(name = "PACIENT_SEQ", sequenceName = "PACIENT_SEQ", allocationSize = 1)
    @Column(name = "id_pacient")
    private Long idPacient;

    @Column(name = "nume_pacient", nullable = false)
    private String numePacient;

    @Column(name = "prenume_pacient", nullable = false)
    private String prenumePacient;

    @Column(name = "data_nastere_pacient", nullable = false)
    private LocalDate dataNasterePacient;

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

    @JsonManagedReference(value = "pacient-fiseMedicale")
    @OneToMany(mappedBy = "pacient")
    private List<FisaMedicala> fiseMedicale = new ArrayList<>();

    @JsonManagedReference(value = "pacient-consultatii")
    @OneToMany(mappedBy = "pacient")
    private List<Consultatie> consultatii = new ArrayList<>();

    @JsonManagedReference(value = "pacient-analize")
    @OneToMany(mappedBy = "pacient")
    private List<Analiza> analize = new ArrayList<>();

    public Pacient() {
    }

    public Pacient(Long idPacient, String numePacient, String prenumePacient, LocalDate dataNasterePacient, String cnpPacient, String sexPacient, Double greutatePacient, Double inaltimePacient, char asigurat, String telefonPacient, String emailPacient, char abonamentPacient, List<FisaMedicala> fiseMedicale, List<Consultatie> consultatii, List<Analiza> analize) {
        this.idPacient = idPacient;
        this.numePacient = numePacient;
        this.prenumePacient = prenumePacient;
        this.dataNasterePacient = dataNasterePacient;
        this.cnpPacient = cnpPacient;
        this.sexPacient = sexPacient;
        this.greutatePacient = greutatePacient;
        this.inaltimePacient = inaltimePacient;
        this.asigurat = asigurat;
        this.telefonPacient = telefonPacient;
        this.emailPacient = emailPacient;
        this.abonamentPacient = abonamentPacient;
        this.fiseMedicale = fiseMedicale;
        this.consultatii = consultatii;
        this.analize = analize;
    }

    public Long getIdPacient() {
        return idPacient;
    }

    public void setIdPacient(Long idPacient) {
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

    public LocalDate getDataNasterePacient() {
        return dataNasterePacient;
    }

    public void setDataNasterePacient(LocalDate dataNasterePacient) {
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

    public List<FisaMedicala> getFiseMedicale() {
        return fiseMedicale;
    }

    public void setFiseMedicale(List<FisaMedicala> fiseMedicale) {
        this.fiseMedicale = fiseMedicale;
    }

    public List<Consultatie> getConsultatii() {
        return consultatii;
    }

    public void setConsultatii(List<Consultatie> consultatii) {
        this.consultatii = consultatii;
    }

    public List<Analiza> getAnalize() {
        return analize;
    }

    public void setAnalize(List<Analiza> analize) {
        this.analize = analize;
    }
}
