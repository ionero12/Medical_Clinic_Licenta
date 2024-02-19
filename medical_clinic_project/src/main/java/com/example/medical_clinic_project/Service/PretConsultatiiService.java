package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.PretConsultatii;
import com.example.medical_clinic_project.Model.PretConsultatiiId;
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

    public void detelePretConsultatii(PretConsultatiiId id) {
        boolean exists = pretConsultatiiRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Pretul consultatiei cu id-ul " + id + " nu exista");
        }
        pretConsultatiiRepository.deleteById(id);
    }
}
