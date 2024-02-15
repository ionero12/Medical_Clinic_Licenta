package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Medic;
import com.example.medical_clinic_project.Model.Pacient;
import com.example.medical_clinic_project.Repository.MedicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicService {
    private final MedicRepository medicRepository;

    @Autowired
    public MedicService(MedicRepository medicRepository) {
        this.medicRepository = medicRepository;
    }

    public List<Medic> getMedici() {
        return medicRepository.findAll();
    }

    public void addMedic(Medic medic) {
        Optional<Pacient> medicOptional = medicRepository.findMedicByCnp(medic.getCnpMedic());
        if (medicOptional.isPresent()) {
            throw new IllegalStateException("Medicul exista deja");
        }
        medicRepository.save(medic);
    }
}
