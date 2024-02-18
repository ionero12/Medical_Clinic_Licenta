package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.PretConsultatii;
import com.example.medical_clinic_project.Repository.PretConsultatiiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PretConsultatiiService {
    PretConsultatiiRepository pretConsultatiiRepository;

    @Autowired
    public PretConsultatiiService(PretConsultatiiRepository pretConsultatiiRepository) {
        this.pretConsultatiiRepository = pretConsultatiiRepository;
    }

    public List<PretConsultatii> getPretConsultatii() {
        return pretConsultatiiRepository.findAll();
    }

    public void addPretConsultatii(PretConsultatii pretConsultatii) {
        pretConsultatiiRepository.save(pretConsultatii);
    }
}
