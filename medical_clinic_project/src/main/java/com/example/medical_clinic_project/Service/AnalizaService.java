package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Analiza;
import com.example.medical_clinic_project.Repository.AnalizaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalizaService {
    private final AnalizaRepository analizaRepository;

    @Autowired
    public AnalizaService(AnalizaRepository analizaRepository) {
        this.analizaRepository = analizaRepository;
    }

    public List<Analiza> getAnalize() {
        return analizaRepository.findAll();
    }
}
