package com.example.medical_clinic_BACKEND.Model;


public class Symptoms {
    String patientDescriptionOfSymptoms;

    public Symptoms() {
    }

    public Symptoms(String patientDescriptionOfSymptoms) {
        this.patientDescriptionOfSymptoms = patientDescriptionOfSymptoms;
    }

    public String getPatientDescriptionOfSymptoms() {
        return patientDescriptionOfSymptoms;
    }

    public void setPatientDescriptionOfSymptoms(String patientDescriptionOfSymptoms) {
        this.patientDescriptionOfSymptoms = patientDescriptionOfSymptoms;
    }
}

