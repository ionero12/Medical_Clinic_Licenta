package com.example.medical_clinic_project.Service;


import com.example.medical_clinic_project.Model.Specializare;
import com.example.medical_clinic_project.Repository.SpecializareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecializareService {
    private final SpecializareRepository specializareRepository;

    @Autowired
    public SpecializareService(SpecializareRepository specializareRepository) {
        this.specializareRepository = specializareRepository;
    }

    public List<Specializare> getSpecializari() {
        return specializareRepository.findAll();
    }
}
