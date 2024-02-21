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

    public void updatePacient(Long pacientId, String numePacient, String prenumePacient, String cnpPacient, String telefonPacient, String emailPacient, String parolaPacient, Double greutatePacient, Double inaltimePacient, char asigurat, char abonamentPacient) {
        Pacient pacient = pacientRepository.findById(pacientId).orElseThrow(() -> new IllegalStateException("Pacientul cu id-ul " + pacientId + " nu exista"));
        if(numePacient != null && numePacient.length() > 0 && !pacient.getNumePacient().equals(numePacient)) {
            pacient.setNumePacient(numePacient);
        }
        if(prenumePacient != null && prenumePacient.length() > 0 && !pacient.getPrenumePacient().equals(prenumePacient)) {
            pacient.setPrenumePacient(prenumePacient);
        }
        if(cnpPacient != null && cnpPacient.length() > 0 && !pacient.getCnpPacient().equals(cnpPacient)) {
            pacient.setCnpPacient(cnpPacient);
        }
        if(telefonPacient != null && telefonPacient.length() > 0 && !pacient.getTelefonPacient().equals(telefonPacient)) {
            pacient.setTelefonPacient(telefonPacient);
        }
        if(emailPacient != null && emailPacient.length() > 0 && !pacient.getEmailPacient().equals(emailPacient)) {
            pacient.setEmailPacient(emailPacient);
        }
        if(greutatePacient != null && !pacient.getGreutatePacient().equals(greutatePacient)){
            pacient.setGreutatePacient(greutatePacient);
        }
        if(inaltimePacient != null && !pacient.getInaltimePacient().equals(inaltimePacient)){
            pacient.setInaltimePacient(inaltimePacient);
        }
        if(asigurat != '\0' && pacient.getAsigurat() != asigurat){
            pacient.setAsigurat(asigurat);
        }
        if(abonamentPacient != '\0' && pacient.getAbonamentPacient() != abonamentPacient){
            pacient.setAbonamentPacient(abonamentPacient);
        }
    }
}
