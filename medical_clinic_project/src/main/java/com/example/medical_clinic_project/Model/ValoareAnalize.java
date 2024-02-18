package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "analize_valori")
public class ValoareAnalize {

    @EmbeddedId
    private ValoareAnalizeId id;

    @ManyToOne
    @MapsId("analizeIdAnaliza")
    @JoinColumn(name = "analize_id_analiza")
    private Analiza analiza;

    @ManyToOne
    @MapsId("valoriIdValoare")
    @JoinColumn(name = "valori_id_valoare")
    private Valoare valoare;

    public ValoareAnalize() {
    }

    public ValoareAnalize(ValoareAnalizeId id, Analiza analiza, Valoare valoare) {
        this.id = id;
        this.analiza = analiza;
        this.valoare = valoare;
    }

    public ValoareAnalizeId getId() {
        return id;
    }

    public void setId(ValoareAnalizeId id) {
        this.id = id;
    }

    public Analiza getAnaliza() {
        return analiza;
    }

    public void setAnaliza(Analiza analiza) {
        this.analiza = analiza;
    }

    public Valoare getValoare() {
        return valoare;
    }

    public void setValoare(Valoare valoare) {
        this.valoare = valoare;
    }
}