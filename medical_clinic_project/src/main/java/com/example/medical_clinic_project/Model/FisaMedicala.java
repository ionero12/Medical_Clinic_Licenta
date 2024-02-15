package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "fise_medicale")
public class FisaMedicala {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FISA_MEDICALA_SEQ")
    @SequenceGenerator(name = "FISA_MEDICALA_SEQ", sequenceName = "FISA_MEDICALA_SEQ", allocationSize = 1)
    @Column(name = "id_fisa_medicala")
    private Long idFisaMedicala;


    @Column(name = "data_investigatie", nullable = false)
    private LocalDate dataInvestigatie;

    @Column(name = "descriere_investigatie", nullable = false, length = 512)
    private String descriereInvestigatie;

    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    public FisaMedicala() {
    }

    public FisaMedicala(Long idFisaMedicala, LocalDate dataInvestigatie, String descriereInvestigatie, Pacient pacient) {
        this.idFisaMedicala = idFisaMedicala;
        this.dataInvestigatie = dataInvestigatie;
        this.descriereInvestigatie = descriereInvestigatie;
        this.pacient = pacient;
    }

    public Long getIdFisaMedicala() {
        return idFisaMedicala;
    }

    public void setIdFisaMedicala(Long idFisaMedicala) {
        this.idFisaMedicala = idFisaMedicala;
    }

    public LocalDate getDataInvestigatie() {
        return dataInvestigatie;
    }

    public void setDataInvestigatie(LocalDate dataInvestigatie) {
        this.dataInvestigatie = dataInvestigatie;
    }

    public String getDescriereInvestigatie() {
        return descriereInvestigatie;
    }

    public void setDescriereInvestigatie(String descriereInvestigatie) {
        this.descriereInvestigatie = descriereInvestigatie;
    }

    public Pacient getPacient() {
        return pacient;
    }

    public void setPacient(Pacient pacient) {
        this.pacient = pacient;
    }
}
