package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "valori")
public class Valoare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_valoare")
    private int idValoare;

    @Column(name = "nume_valoare", nullable = false, length = 32)
    private String numeValoare;

    @Column(name = "rezultat_valoare", nullable = false)
    private Double rezultatValoare;

    public int getIdValoare() {
        return idValoare;
    }

    public void setIdValoare(int idValoare) {
        this.idValoare = idValoare;
    }

    public String getNumeValoare() {
        return numeValoare;
    }

    public void setNumeValoare(String numeValoare) {
        this.numeValoare = numeValoare;
    }

    public Double getRezultatValoare() {
        return rezultatValoare;
    }

    public void setRezultatValoare(Double rezultatValoare) {
        this.rezultatValoare = rezultatValoare;
    }
}