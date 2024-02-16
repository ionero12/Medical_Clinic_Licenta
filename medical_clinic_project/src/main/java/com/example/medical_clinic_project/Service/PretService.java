package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Pret;
import com.example.medical_clinic_project.Repository.PretRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PretService {
    private final PretRepository pretRepository;

    @Autowired
    public PretService(PretRepository pretRepository) {
        this.pretRepository = pretRepository;
    }

    public List<Pret> getPreturi() {
        return pretRepository.findAll();
    }

    public void addPret(Pret pret) {
        pretRepository.save(pret);
    }
}
