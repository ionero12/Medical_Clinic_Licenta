package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.ValoareAnalize;
import com.example.medical_clinic_BACKEND.Model.ValoareAnalizeId;
import com.example.medical_clinic_BACKEND.Repository.ValoareAnalizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ValoareAnalizeService {
    ValoareAnalizeRepository valoareAnalizeRepository;

    @Autowired
    public ValoareAnalizeService(ValoareAnalizeRepository valoareAnalizeRepository) {
        this.valoareAnalizeRepository = valoareAnalizeRepository;
    }

    public void addValoareAnalize(ValoareAnalize valoareAnalize) {
        valoareAnalizeRepository.save(valoareAnalize);
    }

    public void deleteValoareAnalize(ValoareAnalizeId id) {
        boolean exists = valoareAnalizeRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Valoarea analizei cu id-ul " + id + " nu exista");
        }
        valoareAnalizeRepository.deleteById(id);
    }

    public List<ValoareAnalize> getValoareAnalizeByIdPacient(Long idPacient) {
        return valoareAnalizeRepository.findAll().stream().filter(valoareAnalize -> valoareAnalize.getAnaliza().getPacient().getIdPacient().equals(idPacient)).collect(Collectors.toList());
    }

    public List<ValoareAnalize> getValoareAnalize() {
        return valoareAnalizeRepository.findAll();
    }
}
