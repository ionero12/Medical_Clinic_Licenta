package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Pacient;
import com.example.medical_clinic_project.Repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacientService{
    private final PacientRepository pacientRepository;

    @Autowired
    public PacientService(PacientRepository pacientRepository) {
        this.pacientRepository = pacientRepository;
    }

    public List<Pacient> getPacienti(){
        return pacientRepository.findAll();
    }
}
