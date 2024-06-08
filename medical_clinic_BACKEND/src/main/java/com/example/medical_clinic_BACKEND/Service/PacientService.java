package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Repository.PacientRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PacientService {
    private final PacientRepository pacientRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public PacientService(PacientRepository pacientRepository, BCryptPasswordEncoder passwordEncoder) {
        this.pacientRepository = pacientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Pacient> getPacienti() {
        return pacientRepository.findAll();
    }

    public void addPacient(Pacient pacient) {
        Optional<Pacient> pacientOptional = pacientRepository.findPacientByCnp(pacient.getCnpPacient());
        if (pacientOptional.isPresent()) {
            throw new IllegalArgumentException("Pacientul exista deja");
        }
        pacient.setParolaPacient(passwordEncoder.encode(pacient.getParolaPacient()));
        pacientRepository.save(pacient);
    }

    public void deletePacient(Long idPacient) {
        boolean exists = pacientRepository.existsById(idPacient);
        if (!exists) {
            throw new IllegalStateException("Pacientul cu id-ul " + idPacient + " nu exista");
        }
        pacientRepository.deleteById(idPacient);
    }

    @Transactional
    public void updatePacient(Long idPacient, String numePacient, String prenumePacient , String telefonPacient, String emailPacient, String parolaPacient, Double inaltimePacient, Double greutatePacient, Character asigurat, Character abonamentPacient, Integer varstaPacient) {
        Pacient pacient = pacientRepository.findById(idPacient).orElseThrow(() -> new IllegalStateException("Pacientul cu id-ul " + idPacient + " nu exista"));
        if (numePacient != null && !numePacient.isEmpty() && !pacient.getNumePacient().equals(numePacient)) {
            pacient.setNumePacient(numePacient);
        }
        if (prenumePacient != null && !prenumePacient.isEmpty() && !pacient.getPrenumePacient().equals(prenumePacient)) {
            pacient.setPrenumePacient(prenumePacient);
        }
        if (telefonPacient != null && !telefonPacient.isEmpty() && !pacient.getTelefonPacient().equals(telefonPacient)) {
            pacient.setTelefonPacient(telefonPacient);
        }
        if (emailPacient != null && !emailPacient.isEmpty() && !pacient.getEmailPacient().equals(emailPacient)) {
            pacient.setEmailPacient(emailPacient);
        }
        if (greutatePacient != null && !pacient.getGreutatePacient().equals(greutatePacient)) {
            pacient.setGreutatePacient(greutatePacient);
        }
        if (inaltimePacient != null && !pacient.getInaltimePacient().equals(inaltimePacient)) {
            pacient.setInaltimePacient(inaltimePacient);
        }
        if (asigurat != null && !pacient.getAsigurat().equals(asigurat)) {
            pacient.setAsigurat(asigurat);
        }
        if (abonamentPacient != null && !pacient.getAbonamentPacient().equals(abonamentPacient)) {
            pacient.setAbonamentPacient(abonamentPacient);
        }
        if (parolaPacient != null && !parolaPacient.isEmpty() && !pacient.getParolaPacient().equals(parolaPacient)) {
            pacient.setParolaPacient(passwordEncoder.encode(parolaPacient));
        }
        if (varstaPacient != null && !pacient.getVarstaPacient().equals(varstaPacient)) {
            pacient.setVarstaPacient(varstaPacient);
        }

        // Validează obiectul Pacient
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Pacient>> violations = validator.validate(pacient);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        // Salvează modificările în baza de date
        pacientRepository.save(pacient);
    }

    public boolean isValidCredentials(String emailPacient, String parolaPacient) {
        Optional<Pacient> pacientOptional = pacientRepository.findPacientByEmailPacient(emailPacient);
        if (pacientOptional.isPresent()) {
            Pacient pacient = pacientOptional.get();
            return passwordEncoder.matches(parolaPacient, pacient.getParolaPacient());
        }
        return false;
    }

    public Pacient getPacientById(Long idPacient) {
        return pacientRepository.findById(idPacient).orElseThrow(() -> new IllegalStateException("Pacientul cu id-ul " + idPacient + " nu exista"));
    }

    public Pacient getPacientByEmail(String emailPacient) {
        Optional<Pacient> pacientOptional = pacientRepository.findPacientByEmailPacient(emailPacient);
        return pacientOptional.orElse(null);
    }

    public Pacient getPacientByCnp(String cnpPacient) {
        Optional<Pacient> pacientOptional = pacientRepository.findPacientByCnp(cnpPacient);
        return pacientOptional.orElse(null);
    }
}
