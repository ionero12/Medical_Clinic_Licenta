package com.example.medical_clinic_project.Service;

import com.example.medical_clinic_project.Model.ValoareAnalize;
import com.example.medical_clinic_project.Repository.ValoareAnalizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ValoareAnalizeService {
    ValoareAnalizeRepository valoareAnalizeRepository;

    @Autowired
    public ValoareAnalizeService(ValoareAnalizeRepository valoareAnalizeRepository) {
        this.valoareAnalizeRepository = valoareAnalizeRepository;
    }

    public List<ValoareAnalize> getValoareAnalize() {
        return valoareAnalizeRepository.findAll();
    }

    public void addValoareAnalize(ValoareAnalize valoareAnalize) {
        valoareAnalizeRepository.save(valoareAnalize);
    }
}
