package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Specializare;
import com.example.medical_clinic_BACKEND.Service.SpecializareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public void addSpecializare(@RequestBody Specializare specializare) {
        specializareService.addSpecializare(specializare);
    }

    @DeleteMapping(path = "{specializareId}")
    public void deleteSpecializare(@PathVariable("specializareId") Long specializareId) {
        specializareService.deleteSpecializare(specializareId);
    }
}
