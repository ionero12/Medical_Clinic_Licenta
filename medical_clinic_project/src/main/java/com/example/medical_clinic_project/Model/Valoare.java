package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "valori")
public class Valoare {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VALOARE_SEQ")
    @SequenceGenerator(name = "VALOARE_SEQ", sequenceName = "VALOARE_SEQ", allocationSize = 1)
    @Column(name = "id_valoare")
    private Long idValoare;

    @Column(name = "nume_valoare", nullable = false, length = 32)
    private String numeValoare;

    @Column(name = "rezultat_valoare", nullable = false)
    private Double rezultatValoare;

    public Valoare() {
    }

    public Valoare(Long idValoare, String numeValoare, Double rezultatValoare) {
        this.idValoare = idValoare;
        this.numeValoare = numeValoare;
        this.rezultatValoare = rezultatValoare;
    }

    public Long getIdValoare() {
        return idValoare;
    }

    public void setIdValoare(Long idValoare) {
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