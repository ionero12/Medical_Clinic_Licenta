package com.example.medical_clinic_BACKEND.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "diagnostice")
public class Diagnostic {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DIAGNOSTIC_SEQ")
    @SequenceGenerator(name = "DIAGNOSTIC_SEQ", sequenceName = "DIAGNOSTIC_SEQ", allocationSize = 1)
    @Column(name = "id_diagnostic")
    private Long idDiagnostic;

    @Column(name = "nume_diagnostic", nullable = false, length = 64)
    private String numeDiagnostic;

    @Column(name = "data_diagnostic",nullable = false)
    private LocalDate dataDiagnostic;

    @Column(name = "descriere_diagnostic", length = 256)
    private String descriereDiagnostic;

    @JsonBackReference(value = "pacient-diagnostice")
    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    public Diagnostic() {
    }

    public Diagnostic(Long idDiagnostic, String numeDiagnostic, LocalDate dataDiagnostic, String descriereDiagnostic, Pacient pacient) {
        this.idDiagnostic = idDiagnostic;
        this.numeDiagnostic = numeDiagnostic;
        this.dataDiagnostic = dataDiagnostic;
        this.descriereDiagnostic = descriereDiagnostic;
        this.pacient = pacient;
    }

    public Long getIdDiagnostic() {
        return idDiagnostic;
    }

    public void setIdDiagnostic(Long idDiagnostic) {
        this.idDiagnostic = idDiagnostic;
    }

    public String getNumeDiagnostic() {
        return numeDiagnostic;
    }

    public void setNumeDiagnostic(String numeDiagnostic) {
        this.numeDiagnostic = numeDiagnostic;
    }

    public String getDescriereDiagnostic() {
        return descriereDiagnostic;
    }

    public void setDescriereDiagnostic(String descriereDiagnostic) {
        this.descriereDiagnostic = descriereDiagnostic;
    }

    public Pacient getPacient() {
        return pacient;
    }

    public void setPacient(Pacient pacient) {
        this.pacient = pacient;
    }

    public LocalDate getDataDiagnostic() {
        return dataDiagnostic;
    }

    public void setDataDiagnostic(LocalDate dataDiagnostic) {
        this.dataDiagnostic = dataDiagnostic;
    }
}