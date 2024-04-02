package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Service.ConsultatieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
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
    public List<Consultatie> getConsultatii(@RequestParam(required = false) Long idMedic, @RequestParam(required = false) Long idPacient) {
        return consultatieService.getConsultatii(idMedic,  idPacient);
    }

    @GetMapping(path = "/preturi")
    public List<Consultatie> getConsultatiiWithPrices(){
        return consultatieService.getConsultatiiWithPrices();
    }

    @PostMapping
    public ResponseEntity<Consultatie> addConsultatie(@RequestBody Consultatie consultatie) {
        consultatieService.addConsultatie(consultatie);
        return ResponseEntity.ok(consultatie);
    }

    @DeleteMapping(path = "{idConsultatie}")
    public void deleteConsultatie(@PathVariable("idConsultatie") Long idConsultatie) {
        consultatieService.deleteConsultatie(idConsultatie);
    }

    @PutMapping(path = "{idConsultatie}")
    public Consultatie updateConsultatie(@PathVariable("idConsultatie") Long idConsultatie, @RequestParam(required = false) LocalDateTime dataConsultatiei) {
        return consultatieService.updateConsultatie(idConsultatie, dataConsultatiei);
    }
}

