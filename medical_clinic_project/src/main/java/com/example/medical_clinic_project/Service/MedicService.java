package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Medic;
import com.example.medical_clinic_project.Repository.MedicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicService {
    private final MedicRepository medicRepository;

    @Autowired
    public MedicService(MedicRepository medicRepository) {
        this.medicRepository = medicRepository;
    }

    public List<Medic> getMedici() {
        return medicRepository.findAll();
    }
}
