package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Specializare;
import com.example.medical_clinic_project.Service.SpecializareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/specializare")
public class SpecializareController {
    private final SpecializareService specializareService;

    @Autowired
    public SpecializareController(SpecializareService specializareService) {
        this.specializareService = specializareService;
    }

    @GetMapping
    public List<Specializare> getSpecializari() {
        return specializareService.getSpecializari();
    }


}
