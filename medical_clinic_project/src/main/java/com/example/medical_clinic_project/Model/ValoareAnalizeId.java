package com.example.medical_clinic_project.Model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class ValoareAnalizeId implements Serializable {

    private Long analizeIdAnaliza;
    private Long valoriIdValoare;

}