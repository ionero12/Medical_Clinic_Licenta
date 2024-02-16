package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Medic;
import com.example.medical_clinic_project.Service.MedicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/medic")
public class MedicController {
    private final MedicService medicService;

    @Autowired
    public MedicController(MedicService medicService) {
        this.medicService = medicService;
    }

    @GetMapping
    public List<Medic> getMedici() {
        return medicService.getMedici();
    }

    @PostMapping
    public void addMedic(@RequestBody Medic medic) {
        medicService.addMedic(medic);
    }


}
