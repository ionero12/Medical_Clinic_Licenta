package com.example.medical_clinic_BACKEND.Model;

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

    @Column(name = "valoare_min")
    private Double valoareMin;

    @Column(name = "valoare_max")
    private Double valoareMax;

    public Valoare() {
    }

    public Valoare(Long idValoare, String numeValoare, Double rezultatValoare) {
        this.idValoare = idValoare;
        this.numeValoare = numeValoare;
        this.rezultatValoare = rezultatValoare;
    }

    public Valoare(Long idValoare, String numeValoare, Double rezultatValoare, Double valoareMin, Double valoareMax) {
        this.idValoare = idValoare;
        this.numeValoare = numeValoare;
        this.rezultatValoare = rezultatValoare;
        this.valoareMin = valoareMin;
        this.valoareMax = valoareMax;
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

    public Double getValoareMin() {
        return valoareMin;
    }

    public void setValoareMin(Double valoareMin) {
        this.valoareMin = valoareMin;
    }

    public Double getValoareMax() {
        return valoareMax;
    }

    public void setValoareMax(Double valoareMax) {
        this.valoareMax = valoareMax;
    }
}