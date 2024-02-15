package com.example.medical_clinic_project.Model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class PretConsultatiiId implements Serializable {

    private Long consultatiiIdConsultatie;
    private Long preturiIdPret;

}