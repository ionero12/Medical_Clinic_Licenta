package com.example.medical_clinic_BACKEND.Model;

import java.util.HashMap;
import java.util.Map;

public class Symptoms {
    private Map<String, Integer> symptoms;

    public Symptoms() {
        symptoms = new HashMap<>();
    }

    public Symptoms(Map<String, Integer> symptoms) {
        this.symptoms = symptoms;
    }

    public Map<String, Integer> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(Map<String, Integer> symptoms) {
        this.symptoms = symptoms;
    }

    @Override
    public String toString() {
        return "Symptoms: " + symptoms.toString();
    }

}

