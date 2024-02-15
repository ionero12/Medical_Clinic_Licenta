package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "preturi")
public class Pret {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pret")
    private int idPret;

    @Column(name = "valoare", nullable = false)
    private Double valoare;

    public int getIdPret() {
        return idPret;
    }

    public void setIdPret(int idPret) {
        this.idPret = idPret;
    }

    public Double getValoare() {
        return valoare;
    }

    public void setValoare(Double valoare) {
        this.valoare = valoare;
    }
}
