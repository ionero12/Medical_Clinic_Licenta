package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "preturi")
public class Pret {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRET_SEQ")
    @SequenceGenerator(name = "PRET_SEQ", sequenceName = "PRET_SEQ", allocationSize = 1)
    @Column(name = "id_pret")
    private Long idPret;

    @Column(name = "valoare", nullable = false)
    private Double valoare;

    public Pret() {
    }

    public Pret(Long idPret, Double valoare) {
        this.idPret = idPret;
        this.valoare = valoare;
    }

    public Long getIdPret() {
        return idPret;
    }

    public void setIdPret(Long idPret) {
        this.idPret = idPret;
    }

    public Double getValoare() {
        return valoare;
    }

    public void setValoare(Double valoare) {
        this.valoare = valoare;
    }
}
