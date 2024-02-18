package com.example.medical_clinic_project.Model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class ValoareAnalizeId implements Serializable {

    private Long analizeIdAnaliza;
    private Long valoriIdValoare;

    public ValoareAnalizeId() {
    }

    public ValoareAnalizeId(Long analizeIdAnaliza, Long valoriIdValoare) {
        this.analizeIdAnaliza = analizeIdAnaliza;
        this.valoriIdValoare = valoriIdValoare;
    }

    public Long getAnalizeIdAnaliza() {
        return analizeIdAnaliza;
    }

    public void setAnalizeIdAnaliza(Long analizeIdAnaliza) {
        this.analizeIdAnaliza = analizeIdAnaliza;
    }

    public Long getValoriIdValoare() {
        return valoriIdValoare;
    }

    public void setValoriIdValoare(Long valoriIdValoare) {
        this.valoriIdValoare = valoriIdValoare;
    }
}