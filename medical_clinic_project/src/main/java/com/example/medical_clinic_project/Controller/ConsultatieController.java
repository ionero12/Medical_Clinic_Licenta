package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Consultatie;
import com.example.medical_clinic_project.Service.ConsultatieService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/consultatie")
public class ConsultatieController {
    private static final Logger logger = LoggerFactory.getLogger(ConsultatieController.class);
    private final ConsultatieService consultatieService;


    @Autowired
    public ConsultatieController(ConsultatieService consultatieService) {
        this.consultatieService = consultatieService;
    }

    @GetMapping
    public List<Consultatie> getConsultatii() {
        return consultatieService.getConsultatii();
    }

    @PostMapping
    public void addConsultatie(@RequestBody Consultatie consultatie) {
        consultatieService.addConsultatie(consultatie);
    }
}

