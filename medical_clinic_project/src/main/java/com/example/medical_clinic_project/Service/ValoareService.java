package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Valoare;
import com.example.medical_clinic_project.Repository.ValoareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValoareService {
    private final ValoareRepository valoareRepository;

    @Autowired
    public ValoareService(ValoareRepository valoareRepository) {
        this.valoareRepository = valoareRepository;
    }

    public List<Valoare> getValori() {
        return valoareRepository.findAll();
    }

    public void addValoare(Valoare valoare) {
        valoareRepository.save(valoare);
    }
}
