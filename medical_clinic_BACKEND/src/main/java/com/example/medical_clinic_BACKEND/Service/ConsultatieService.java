package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Repository.ConsultatieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultatieService {
    private final ConsultatieRepository consultatieRepository;

    @Autowired
    public ConsultatieService(ConsultatieRepository consultatieRepository) {
        this.consultatieRepository = consultatieRepository;
    }

    public List<Consultatie> getConsultatii() {
        return consultatieRepository.findAll();
    }

    public void addConsultatie(Consultatie consultatie) {
        consultatieRepository.save(consultatie);
    }

    public void deleteConsultatie(Long consultatieId) {
        boolean exists = consultatieRepository.existsById(consultatieId);
        if (!exists) {
            throw new IllegalStateException("Consultatia cu id-ul " + consultatieId + " nu exista");
        }
        consultatieRepository.deleteById(consultatieId);
    }
}
