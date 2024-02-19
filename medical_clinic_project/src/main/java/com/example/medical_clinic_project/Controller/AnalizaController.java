package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Analiza;
import com.example.medical_clinic_project.Service.AnalizaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/analiza")
public class AnalizaController {
    private final AnalizaService analizaService;

    @Autowired
    public AnalizaController(AnalizaService analizaService) {
        this.analizaService = analizaService;
    }

    @GetMapping
    public List<Analiza> getAnalize() {
        return analizaService.getAnalize();
    }

    @PostMapping
    public void addAnaliza(@RequestBody Analiza analiza) {
        analizaService.addAnaliza(analiza);
    }

    @DeleteMapping(path = "{analizaId}")
    public void deleteAnaliza(@PathVariable("analizaId") Long analizaId) {
        analizaService.deleteAnaliza(analizaId);
    }
}
