package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Pacient;
import com.example.medical_clinic_project.Service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/pacient")
public class PacientController {
    private final PacientService pacientService;

    @Autowired
    public PacientController(PacientService pacientService) {
        this.pacientService = pacientService;
    }

    @GetMapping
    public List<Pacient> getPacienti() {
        return pacientService.getPacienti();
    }

    @PostMapping
    public void addPacient(@RequestBody Pacient pacient) {
        pacientService.addPacient(pacient);
    }
}
