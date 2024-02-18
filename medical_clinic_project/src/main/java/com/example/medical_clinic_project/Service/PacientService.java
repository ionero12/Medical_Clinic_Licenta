package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Pacient;
import com.example.medical_clinic_project.Repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacientService {
    private final PacientRepository pacientRepository;

    @Autowired
    public PacientService(PacientRepository pacientRepository) {
        this.pacientRepository = pacientRepository;
    }

    public List<Pacient> getPacienti() {
        return pacientRepository.findAll();
    }

    public void addPacient(Pacient pacient) {
        Optional<Pacient> pacientOptional = pacientRepository.findPacientByCnp(pacient.getCnpPacient());
        if (pacientOptional.isPresent()) {
            throw new IllegalStateException("Pacientul exista deja");
        }
        pacientRepository.save(pacient);
    }

    public void deletePacient(Long pacientId) {
        boolean exists = pacientRepository.existsById(pacientId);
        if (!exists) {
            throw new IllegalStateException("Pacientul cu id-ul " + pacientId + " nu exista");
        }
        pacientRepository.deleteById(pacientId);
    }
}
