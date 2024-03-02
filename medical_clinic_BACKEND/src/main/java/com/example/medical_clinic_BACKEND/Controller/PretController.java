package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Pret;
import com.example.medical_clinic_BACKEND.Service.PretService;
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

    @DeleteMapping(path = "{pretId}")
    public void deletePret(@PathVariable("pretId") Long pretId) {
        pretService.deletePret(pretId);
    }

    @PutMapping(path = "{pretId}")
    public void updatePret(@PathVariable("pretId") Long pretId, @RequestParam(required = false) Double valoare){
        pretService.updatePret(pretId, valoare);
    }
}
