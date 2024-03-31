package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.ValoareAnalize;
import com.example.medical_clinic_BACKEND.Model.ValoareAnalizeId;
import com.example.medical_clinic_BACKEND.Service.ValoareAnalizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/valoare_analize")
public class ValoareAnalizeController {

    private final ValoareAnalizeService valoareAnalizeService;

    @Autowired
    public ValoareAnalizeController(ValoareAnalizeService valoareAnalizeService) {
        this.valoareAnalizeService = valoareAnalizeService;
    }

    @GetMapping
    public List<ValoareAnalize> getValoareAnalize(@RequestParam(required = false) Long idPacient) {
        return valoareAnalizeService.getValoareAnalize(idPacient);
    }

    @PostMapping
    public void addValoareAnalize(@RequestBody ValoareAnalize valoareAnalize) {
        valoareAnalizeService.addValoareAnalize(valoareAnalize);
    }


    @DeleteMapping(path = "{analizeIdAnaliza}/{valoriIdValoare}")
    public void deleteValoareAnalize(@PathVariable("analizeIdAnaliza") Long analizeIdAnaliza, @PathVariable("valoriIdValoare") Long valoriIdValoare) {
        ValoareAnalizeId id = new ValoareAnalizeId(analizeIdAnaliza, valoriIdValoare);
        valoareAnalizeService.deleteValoareAnalize(id);
    }

}
