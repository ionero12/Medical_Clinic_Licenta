package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.FisaMedicala;
import com.example.medical_clinic_project.Service.FisaMedicalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/fisamedicala")
public class FisaMedicalaController {
    private final FisaMedicalaService fisaMedicalaService;

    @Autowired
    public FisaMedicalaController(FisaMedicalaService fisaMedicalaService) {
        this.fisaMedicalaService = fisaMedicalaService;
    }

    @GetMapping
    public List<FisaMedicala> getFiseMedicale() {
        return fisaMedicalaService.getFiseMedicale();
    }


}
