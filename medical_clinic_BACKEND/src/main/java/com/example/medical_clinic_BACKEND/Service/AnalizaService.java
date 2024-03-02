package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Analiza;
import com.example.medical_clinic_BACKEND.Repository.AnalizaRepository;
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

    public void addAnaliza(Analiza analiza) {
        analizaRepository.save(analiza);
    }

    public void deleteAnaliza(Long analizaId) {
        boolean exists = analizaRepository.existsById(analizaId);
        if (!exists) {
            throw new IllegalStateException("Analiza cu id-ul " + analizaId + " nu exista");
        }
        analizaRepository.deleteById(analizaId);
    }
}
