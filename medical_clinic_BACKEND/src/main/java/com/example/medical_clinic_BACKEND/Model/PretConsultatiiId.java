package com.example.medical_clinic_BACKEND.Model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class PretConsultatiiId implements Serializable {

    private Long consultatiiIdConsultatie;
    private Long preturiIdPret;

    public PretConsultatiiId() {
    }

    public PretConsultatiiId(Long consultatiiIdConsultatie, Long preturiIdPret) {
        this.consultatiiIdConsultatie = consultatiiIdConsultatie;
        this.preturiIdPret = preturiIdPret;
    }

    public Long getConsultatiiIdConsultatie() {
        return consultatiiIdConsultatie;
    }

    public void setConsultatiiIdConsultatie(Long consultatiiIdConsultatie) {
        this.consultatiiIdConsultatie = consultatiiIdConsultatie;
    }

    public Long getPreturiIdPret() {
        return preturiIdPret;
    }

    public void setPreturiIdPret(Long preturiIdPret) {
        this.preturiIdPret = preturiIdPret;
    }

}