package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Model.Specializare;
import com.example.medical_clinic_BACKEND.Repository.MedicRepository;
import com.example.medical_clinic_BACKEND.Repository.SpecializareRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicService {
    private final MedicRepository medicRepository;
    private final SpecializareRepository specializareRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    @Autowired
    public MedicService(MedicRepository medicRepository, SpecializareRepository specializareRepository, BCryptPasswordEncoder passwordEncoder) {
        this.medicRepository = medicRepository;
        this.specializareRepository = specializareRepository;
        this.passwordEncoder = passwordEncoder;
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
        medic.setParolaMedic(passwordEncoder.encode(medic.getParolaMedic()));
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
    public void updateMedic(Long medicId, String numeMedic, String prenumeMedic, String telefonMedic, String emailMedic, String parolaMedic) {
        Medic medic = medicRepository.findById(medicId).orElseThrow(() -> new IllegalStateException("Medicul cu id-ul " + medicId + " nu exista"));
        if (numeMedic != null && !numeMedic.isEmpty() && !medic.getNumeMedic().equals(numeMedic)) {
            medic.setNumeMedic(numeMedic);
        }
        if (prenumeMedic != null && !prenumeMedic.isEmpty() && !medic.getPrenumeMedic().equals(prenumeMedic)) {
            medic.setPrenumeMedic(prenumeMedic);
        }
        if (telefonMedic != null && !telefonMedic.isEmpty() && !medic.getTelefonMedic().equals(telefonMedic)) {
            medic.setTelefonMedic(telefonMedic);
        }
        if (emailMedic != null && !emailMedic.isEmpty() && !medic.getEmailMedic().equals(emailMedic)) {
            medic.setEmailMedic(emailMedic);
        }
        if (parolaMedic != null && !parolaMedic.isEmpty() && !passwordEncoder.matches(parolaMedic, medic.getParolaMedic())) {
            medic.setParolaMedic(passwordEncoder.encode(parolaMedic));
        }
    }

    public boolean isValidCredentials(String emailMedic, String parolaMedic) {
        Optional<Medic> medicOptional = medicRepository.findMedicByEmail(emailMedic);
        if (medicOptional.isPresent()) {
            Medic medic = medicOptional.get();
            return passwordEncoder.matches(parolaMedic, medic.getParolaMedic());
        }
        return false;
    }

    public Medic findByEmail(String emailMedic) {
        Optional<Medic> medicOptional = medicRepository.findMedicByEmail(emailMedic);
        return medicOptional.orElse(null);
    }

    public Medic getMedicById(Long idMedic) {
        return medicRepository.findById(idMedic).orElseThrow(() -> new IllegalStateException("Medicul cu id-ul " + idMedic + " nu exista"));
    }

    public List<Medic> findBySpecializare(String specializare) {
        return medicRepository.findBySpecializare(specializare);
    }
}
