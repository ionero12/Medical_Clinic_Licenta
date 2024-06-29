package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Pret;
import com.example.medical_clinic_BACKEND.Repository.PretRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PretService {
    private final PretRepository pretRepository;

    @Autowired
    public PretService(PretRepository pretRepository) {
        this.pretRepository = pretRepository;
    }

    public List<Pret> getPreturi() {
        return pretRepository.findAll();
    }

    public void addPret(Pret pret) {
        pretRepository.save(pret);
    }

    public void deletePret(Long pretId) {
        boolean exists = pretRepository.existsById(pretId);
        if (!exists) {
            throw new IllegalStateException("Pretul cu id-ul " + pretId + " nu exista");
        }
        pretRepository.deleteById(pretId);
    }

    @Transactional
    public void updatePret(Long idPret, Double pretFaraAbonament, Double pretCuAbonament) {
        Pret pret = pretRepository.findById(idPret).orElseThrow(() -> new IllegalStateException("Pretul cu id-ul " + idPret + " nu exista"));
        if (pretFaraAbonament != null && !pret.getPretFaraAbonament().equals(pretFaraAbonament)) {
            pret.setPretFaraAbonament(pretFaraAbonament);
        }
        if (pretCuAbonament != null && !pret.getPretCuAbonament().equals(pretCuAbonament)) {
            pret.setPretCuAbonament(pretCuAbonament);
        }
    }
}
