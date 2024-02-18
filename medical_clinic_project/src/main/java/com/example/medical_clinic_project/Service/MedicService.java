package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Medic;
import com.example.medical_clinic_project.Model.Specializare;
import com.example.medical_clinic_project.Repository.MedicRepository;
import com.example.medical_clinic_project.Repository.SpecializareRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicService {
    private final MedicRepository medicRepository;
    private final SpecializareRepository specializareRepository;
    private final ObjectMapper objectMapper;


    @Autowired
    public MedicService(MedicRepository medicRepository, SpecializareRepository specializareRepository, ObjectMapper objectMapper) {
        this.medicRepository = medicRepository;
        this.specializareRepository = specializareRepository;
        this.objectMapper = objectMapper;

    }

    public List<Medic> getMedici() {
        return medicRepository.findAll();
    }

    public void addMedic(Medic medic) {
        Specializare specializare = specializareRepository.findById(medic.getSpecializare().getIdSpecializare()).orElseThrow(() -> new IllegalStateException("Specializare does not exist"));
        medic.setSpecializare(specializare);
        Optional<Medic> medicOptional = medicRepository.findMedicByCnp(medic.getCnpMedic());
        if (medicOptional.isPresent()) {
            throw new IllegalStateException("Medicul exista deja");
        }

        specializare.getMediciList().add(medic);
        medicRepository.save(medic);
    }


    public void deleteMedic(Long medicId) {
        boolean exists = medicRepository.existsById(medicId);
        if (!exists) {
            throw new IllegalStateException("Medicul cu id-ul " + medicId + " nu exista");
        }
        medicRepository.deleteById(medicId);
    }
}
