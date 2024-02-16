package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Consultatie;
import com.example.medical_clinic_project.Repository.ConsultatieRepository;
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
}
