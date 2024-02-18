package com.example.medical_clinic_project.Service;


import com.example.medical_clinic_project.Model.Specializare;
import com.example.medical_clinic_project.Repository.SpecializareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecializareService {
    private final SpecializareRepository specializareRepository;

    @Autowired
    public SpecializareService(SpecializareRepository specializareRepository) {
        this.specializareRepository = specializareRepository;
    }

    public List<Specializare> getSpecializari() {
        return specializareRepository.findAll();
    }

    public void addSpecializare(Specializare specializare) {

        Optional<Specializare> specializareOptional = specializareRepository.findSpecializareByNume(specializare.getNumeSpecializare());
        if (specializareOptional.isPresent()) {
            throw new IllegalStateException("Specializarea exista deja");
        }
        specializareRepository.save(specializare);

    }

    public void deleteSpecializare(Long specializareId) {
        boolean exists = specializareRepository.existsById(specializareId);
        if (!exists) {
            throw new IllegalStateException("Specializarea cu id-ul " + specializareId + " nu exista");
        }
        specializareRepository.deleteById(specializareId);
    }
}
