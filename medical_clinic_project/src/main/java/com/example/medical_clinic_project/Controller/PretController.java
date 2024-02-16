package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Pret;
import com.example.medical_clinic_project.Service.PretService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/pret")
public class PretController {
    private final PretService pretService;

    @Autowired
    public PretController(PretService pretService) {
        this.pretService = pretService;
    }

    @GetMapping
    public List<Pret> getPreturi() {
        return pretService.getPreturi();
    }

    @PostMapping
    public void addPret(@RequestBody Pret pret) {
        pretService.addPret(pret);
    }
}
