package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.*;
import com.example.medical_clinic_BACKEND.Repository.ConsultatieRepository;
import com.example.medical_clinic_BACKEND.Repository.PretRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultatieService {
    private final ConsultatieRepository consultatieRepository;
    private final PretRepository pretRepository;

    @Autowired
    public ConsultatieService(ConsultatieRepository consultatieRepository, PretRepository pretRepository) {
        this.consultatieRepository = consultatieRepository;
        this.pretRepository = pretRepository;
    }

    public List<Consultatie> getConsultatii(Long idMedic, Long idPacient) {
        if (idPacient == null && idMedic != null) {
            List<Consultatie> consultatii = consultatieRepository.findByIdMedic(idMedic);
            for (Consultatie consultatie : consultatii) {
                Pacient pacient = consultatie.getPacient();
                String numePacient = pacient != null ? pacient.getNumePacient() : "Unknown";
                String prenumePacient = pacient != null ? pacient.getPrenumePacient() : "Unknown";
                consultatie.setNumePacient(numePacient);
                consultatie.setPrenumePacient(prenumePacient);
            }
            return consultatii;
        } else if (idMedic == null && idPacient != null) {
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
        return consultatieRepository.findAll();
    }

    public List<Consultatie> getConsultatiiWithPrices(){
        List<Consultatie> consultatii = consultatieRepository.findAll();
        for (Consultatie consultatie : consultatii) {
            Pret pret = consultatie.getPret();
            Double price1 = pret.getPretFaraAbonament();
            Double price2 = pret.getPretCuAbonament();
            consultatie.setPretFaraAbonament(price1);
            consultatie.setPretCuAbonament(price2);
        }
        return consultatii;
    }

    public void addConsultatie(Consultatie consultatie) {
        System.out.println(consultatie.getNumeConsultatie() + " " + consultatie.getDataConsultatiei() + " " + consultatie.getMedic() + " " + consultatie.getPacient() + " " + consultatie.getPret());

        Consultatie existingConsultatie = consultatieRepository.findByName(consultatie.getNumeConsultatie());
        if (consultatie.getNumeConsultatie().equals(existingConsultatie.getNumeConsultatie())) {
            consultatie.setPret(existingConsultatie.getPret());
        }
        else {
            Pret pret = pretRepository.findById(consultatie.getPret().getIdPret()).orElseThrow(() -> new IllegalStateException("Pret does not exist"));
            consultatie.setPret(pret);
            pret.getConsultatii().add(consultatie);
        }
        consultatieRepository.save(consultatie);
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

//    public List<Consultatie> findByIdPacient(Long idPacient) {
//        return consultatieRepository.findByIdPacient(idPacient);
//    }

    @Transactional
    public Consultatie updateConsultatie(Long idConsultatie, LocalDateTime dataConsultatiei) {
        Consultatie consultatie = consultatieRepository.findById(idConsultatie).orElseThrow(() -> new IllegalStateException("Consultatia cu id-ul " + idConsultatie + " nu exista"));
        if (dataConsultatiei != null && !dataConsultatiei.equals(consultatie.getDataConsultatiei())) {
            consultatie.setDataConsultatiei(dataConsultatiei);
        }
        return consultatie;
    }
}
