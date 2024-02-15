package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "fise_medicale")
public class FisaMedicala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fisa_medicala")
    private int idFisaMedicala;

    @Column(name = "data_investigatie", nullable = false)
    private Date dataInvestigatie;

    @Column(name = "descriere_investigatie", nullable = false, length = 512)
    private String descriereInvestigatie;

    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    // Getters and setters

    public int getIdFisaMedicala() {
        return idFisaMedicala;
    }

    public void setIdFisaMedicala(int idFisaMedicala) {
        this.idFisaMedicala = idFisaMedicala;
    }

    public Date getDataInvestigatie() {
        return dataInvestigatie;
    }

    public void setDataInvestigatie(Date dataInvestigatie) {
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
