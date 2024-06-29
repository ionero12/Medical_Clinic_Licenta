package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Model.Pret;
import com.example.medical_clinic_BACKEND.Repository.ConsultatieRepository;
import com.example.medical_clinic_BACKEND.Repository.PacientRepository;
import com.example.medical_clinic_BACKEND.Repository.PretRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConsultatieService {
    private final ConsultatieRepository consultatieRepository;
    private final PretRepository pretRepository;
    private final PacientRepository pacientRepository;

    @Autowired
    public ConsultatieService(ConsultatieRepository consultatieRepository, PretRepository pretRepository, PacientRepository pacientRepository) {
        this.consultatieRepository = consultatieRepository;
        this.pretRepository = pretRepository;
        this.pacientRepository = pacientRepository;
    }

    public List<Consultatie> getConsultatii() {
        return consultatieRepository.findAll();
    }

    public List<Consultatie> getConsultatiiWithPrices() {
        List<Consultatie> consultatii = consultatieRepository.findAll();
        Map<String, Consultatie> uniqueConsultatii = new HashMap<>();
        for (Consultatie consultatie : consultatii) {
            Pret pret = consultatie.getPret();
            Double price1 = pret.getPretFaraAbonament();
            Double price2 = pret.getPretCuAbonament();
            consultatie.setPretFaraAbonament(price1);
            consultatie.setPretCuAbonament(price2);
            uniqueConsultatii.put(consultatie.getNumeConsultatie(), consultatie);
        }
        return new ArrayList<>(uniqueConsultatii.values());
    }


    @Transactional
    public void addConsultatie(Consultatie consultatie) {
        System.out.println(consultatie.getNumeConsultatie() + " " + consultatie.getMedic().getIdMedic() + " " + consultatie.getPacient().getCnpPacient() + " " + consultatie.getPret());

        Pacient pacient = pacientRepository.findByCnp(consultatie.getPacient().getCnpPacient()).orElseThrow(() -> new IllegalStateException("Pacient does not exist"));
        consultatie.setPacient(pacient);

        List<Consultatie> existingConsultaties = consultatieRepository.findByName(consultatie.getNumeConsultatie());
        for (Consultatie existingConsultatie : existingConsultaties) {
            if (consultatie.getNumeConsultatie().equals(existingConsultatie.getNumeConsultatie())) {
                consultatie.setPret(existingConsultatie.getPret());
            } else {
                Pret pret = pretRepository.findById(consultatie.getPret().getIdPret()).orElseThrow(() -> new IllegalStateException("Pret does not exist"));
                consultatie.setPret(pret);
                pret.getConsultatii().add(consultatie);
            }
        }

        try {
            consultatieRepository.save(consultatie);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalStateException("This time is not available anymore. Please select another time.", e);
        }
    }

    public void deleteConsultatie(Long idConsultatie) {
        boolean exists = consultatieRepository.existsById(idConsultatie);
        if (!exists) {
            throw new IllegalStateException("Consultatia cu id-ul " + idConsultatie + " nu exista");
        }
        consultatieRepository.deleteById(idConsultatie);
    }

    public List<Consultatie> findByIdMedic(Long idMedic) {
        return consultatieRepository.findByIdMedic(idMedic);
    }


    @Transactional
    public Consultatie updateConsultatie(Long idConsultatie, LocalDateTime dataConsultatiei, Integer rating, String feedback) {
        System.out.println(idConsultatie + " " + dataConsultatiei + " " + rating + " " + feedback);
        Consultatie consultatie = consultatieRepository.findById(idConsultatie).orElseThrow(() -> new IllegalStateException("Consultatia cu id-ul " + idConsultatie + " nu exista"));

        if (dataConsultatiei != null && !dataConsultatiei.equals(consultatie.getDataConsultatiei())) {
            consultatie.setDataConsultatiei(dataConsultatiei);
        }
        if (rating != null && !rating.equals(consultatie.getRating())) {
            consultatie.setRating(rating);
        }
        if (feedback != null && !feedback.isEmpty() && !feedback.equals(consultatie.getFeedback())) {
            consultatie.setFeedback(feedback);
        }

        try {
            return consultatieRepository.save(consultatie);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalStateException("This time is not available anymore. Please select another time.", e);
        }
    }


    public List<Consultatie> getConsultatiiByMedicId(Long idMedic) {
        List<Consultatie> consultatii = consultatieRepository.findByIdMedic(idMedic);
        for (Consultatie consultatie : consultatii) {
            Pacient pacient = consultatie.getPacient();
            String numePacient = pacient != null ? pacient.getNumePacient() : "Unknown";
            String prenumePacient = pacient != null ? pacient.getPrenumePacient() : "Unknown";
            consultatie.setNumePacient(numePacient);
            consultatie.setPrenumePacient(prenumePacient);
        }
        return consultatii;
    }


    public List<Consultatie> getConsultatiiByPacientId(Long idPacient) {
        List<Consultatie> consultatii = consultatieRepository.findByIdPacient(idPacient);
        for (Consultatie consultatie : consultatii) {
            Medic medic = consultatie.getMedic();
            String numeMedic = medic != null ? medic.getNumeMedic() : "Unknown";
            String prenumeMedic = medic != null ? medic.getPrenumeMedic() : "Unknown";
            consultatie.setNumeMedic(numeMedic);
            consultatie.setPrenumeMedic(prenumeMedic);
        }
        return consultatii;
    }
}
