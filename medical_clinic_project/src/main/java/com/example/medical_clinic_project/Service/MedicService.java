package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Medic;
import com.example.medical_clinic_project.Model.Specializare;
import com.example.medical_clinic_project.Repository.MedicRepository;
import com.example.medical_clinic_project.Repository.SpecializareRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
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

    @Transactional
    public void updateMedic(Long medicId, String nume, String prenume, String cnp, String telefon, String email, String parola, String specializare) {
        Medic medic = medicRepository.findById(medicId).orElseThrow(() -> new IllegalStateException("Medicul cu id-ul " + medicId + " nu exista"));
        if (nume != null && nume.length() > 0 && !medic.getNumeMedic().equals(nume)) {
            medic.setNumeMedic(nume);
        }
        if (prenume != null && prenume.length() > 0 && !medic.getPrenumeMedic().equals(prenume)) {
            medic.setPrenumeMedic(prenume);
        }
        if (cnp != null && cnp.length() > 0 && !medic.getCnpMedic().equals(cnp)) {
            medic.setCnpMedic(cnp);
        }
        if (telefon != null && telefon.length() > 0 && !medic.getTelefonMedic().equals(telefon)) {
            medic.setTelefonMedic(telefon);
        }
        if (email != null && email.length() > 0 && !medic.getEmailMedic().equals(email)) {
            medic.setEmailMedic(email);
        }
        if (parola != null && parola.length() > 0 && !medic.getParolaMedic().equals(parola)) {
            medic.setParolaMedic(parola);
        }
        if (specializare != null && specializare.length() > 0) {
            Specializare specializare1 = specializareRepository.findSpecializareByNume(specializare).orElseThrow(() -> new IllegalStateException("Specializarea nu exista"));
            medic.setSpecializare(specializare1);
        }
    }
}
