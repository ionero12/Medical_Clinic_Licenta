package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Analiza;
import com.example.medical_clinic_BACKEND.Service.AnalizaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Analiza> addAnaliza(@RequestBody Analiza analiza) {
        analizaService.addAnaliza(analiza);
        return ResponseEntity.ok(analiza);
    }

    @DeleteMapping(path = "{analizaId}")
    public void deleteAnaliza(@PathVariable("analizaId") Long analizaId) {
        analizaService.deleteAnaliza(analizaId);
    }
}
