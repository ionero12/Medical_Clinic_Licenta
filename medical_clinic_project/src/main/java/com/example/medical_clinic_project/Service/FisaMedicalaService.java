package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.FisaMedicala;
import com.example.medical_clinic_project.Repository.FisaMedicalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FisaMedicalaService {
    private final FisaMedicalaRepository fisaMedicalaRepository;

    @Autowired
    public FisaMedicalaService(FisaMedicalaRepository fisaMedicalaRepository) {
        this.fisaMedicalaRepository = fisaMedicalaRepository;
    }

    public List<FisaMedicala> getFiseMedicale() {
        return fisaMedicalaRepository.findAll();
    }

    public void addFisaMedicala(FisaMedicala fisaMedicala) {
        fisaMedicalaRepository.save(fisaMedicala);
    }
}
