package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Consultatie;
import com.example.medical_clinic_project.Service.ConsultatieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/consultatie")
public class ConsultatieController {
    private final ConsultatieService consultatieService;

    @Autowired
    public ConsultatieController(ConsultatieService consultatieService) {
        this.consultatieService = consultatieService;
    }

    @GetMapping
    public List<Consultatie> getConsultatii() {
        return consultatieService.getConsultatii();
    }


}
