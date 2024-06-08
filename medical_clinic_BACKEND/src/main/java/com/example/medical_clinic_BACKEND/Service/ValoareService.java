package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Valoare;
import com.example.medical_clinic_BACKEND.Repository.ValoareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValoareService {
    private final ValoareRepository valoareRepository;

    @Autowired
    public ValoareService(ValoareRepository valoareRepository) {
        this.valoareRepository = valoareRepository;
    }

    public List<Valoare> getValori() {
        return valoareRepository.findAll();
    }

    public void addValoare(Valoare valoare) {
        List<Valoare> valori = valoareRepository.findByNumeValoare(valoare.getNumeValoare());
        Valoare existingValoare = valori.get(0);
        if (existingValoare != null) {
            valoare.setValoareMin(existingValoare.getValoareMin());
            valoare.setValoareMax(existingValoare.getValoareMax());
        }
        valoareRepository.save(valoare);
    }


    public void deleteValoare(Long valoareId) {
        boolean exists = valoareRepository.existsById(valoareId);
        if (!exists) {
            throw new IllegalStateException("Valoarea cu id-ul " + valoareId + " nu exista");
        }
        valoareRepository.deleteById(valoareId);
    }

    public Valoare getValoareById(Long idValoare) {
        return valoareRepository.findById(idValoare).orElseThrow(() -> new IllegalStateException("Valoarea cu id-ul " + idValoare + " nu exista"));
    }
}
