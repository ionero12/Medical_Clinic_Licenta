package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.Medic;
import com.example.medical_clinic_project.Model.Specializare;
import com.example.medical_clinic_project.Repository.MedicRepository;
import com.example.medical_clinic_project.Repository.SpecializareRepository;
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
    public void updateMedic(Long medicId, String nume, String prenume, String cnp, String telefon, String email, String parola, String specializare) {
        Medic medic = medicRepository.findById(medicId).orElseThrow(() -> new IllegalStateException("Medicul cu id-ul " + medicId + " nu exista"));
        if (nume != null && !nume.isEmpty() && !medic.getNumeMedic().equals(nume)) {
            medic.setNumeMedic(nume);
        }
        if (prenume != null && !prenume.isEmpty() && !medic.getPrenumeMedic().equals(prenume)) {
            medic.setPrenumeMedic(prenume);
        }
        if (cnp != null && !cnp.isEmpty() && !medic.getCnpMedic().equals(cnp)) {
            medic.setCnpMedic(cnp);
        }
        if (telefon != null && !telefon.isEmpty() && !medic.getTelefonMedic().equals(telefon)) {
            medic.setTelefonMedic(telefon);
        }
        if (email != null && !email.isEmpty() && !medic.getEmailMedic().equals(email)) {
            medic.setEmailMedic(email);
        }
        if (parola != null && !parola.isEmpty() && !passwordEncoder.matches(parola, medic.getParolaMedic())) {
            medic.setParolaMedic(passwordEncoder.encode(parola));
        }
        if (specializare != null && !specializare.isEmpty()) {
            Specializare specializare1 = specializareRepository.findSpecializareByNume(specializare).orElseThrow(() -> new IllegalStateException("Specializarea nu exista"));
            medic.setSpecializare(specializare1);
        }
    }

    public boolean isValidCredentials(String emailMedic, String parolaMedic) {
        Optional<Medic> medicOptional = medicRepository.findByEmailMedic(emailMedic);
        if (medicOptional.isPresent()) {
            Medic medic = medicOptional.get();
            return passwordEncoder.matches(parolaMedic, medic.getParolaMedic());
        }
        return false;
    }
}
