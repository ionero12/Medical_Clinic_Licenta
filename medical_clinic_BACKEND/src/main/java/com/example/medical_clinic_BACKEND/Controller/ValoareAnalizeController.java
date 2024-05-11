package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Analiza;
import com.example.medical_clinic_BACKEND.Model.Valoare;
import com.example.medical_clinic_BACKEND.Model.ValoareAnalize;
import com.example.medical_clinic_BACKEND.Model.ValoareAnalizeId;
import com.example.medical_clinic_BACKEND.Service.AnalizaService;
import com.example.medical_clinic_BACKEND.Service.ValoareAnalizeService;
import com.example.medical_clinic_BACKEND.Service.ValoareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/valoare_analize")
public class ValoareAnalizeController {

    private final ValoareAnalizeService valoareAnalizeService;
    private final AnalizaService analizaService;
    private final ValoareService valoareService;

    @Autowired
    public ValoareAnalizeController(ValoareAnalizeService valoareAnalizeService, AnalizaService analizaService, ValoareService valoareService) {
        this.valoareAnalizeService = valoareAnalizeService;
        this.analizaService = analizaService;
        this.valoareService = valoareService;
    }

    @GetMapping
    public List<ValoareAnalize> getValoareAnalize() {
        return valoareAnalizeService.getValoareAnalize();
    }

    @GetMapping(path = "/pacient")
    public List<ValoareAnalize> getValoareAnalizeByIdPacient(@RequestParam(required = false) Long idPacient) {
        return valoareAnalizeService.getValoareAnalizeByIdPacient(idPacient);
    }

    @PostMapping
    public ResponseEntity<ValoareAnalize> addValoareAnalize(@RequestBody ValoareAnalize valoareAnalize) {
        Analiza analiza = analizaService.getAnalizaById(valoareAnalize.getAnaliza().getIdAnaliza());
        Valoare valoare = valoareService.getValoareById(valoareAnalize.getValoare().getIdValoare());

        valoareAnalize.setAnaliza(analiza);
        valoareAnalize.setValoare(valoare);

        valoareAnalizeService.addValoareAnalize(valoareAnalize);
        return ResponseEntity.ok(valoareAnalize);
    }

    @DeleteMapping(path = "{analizeIdAnaliza}/{valoriIdValoare}")
    public void deleteValoareAnalize(@PathVariable("analizeIdAnaliza") Long analizeIdAnaliza, @PathVariable("valoriIdValoare") Long valoriIdValoare) {
        ValoareAnalizeId id = new ValoareAnalizeId(analizeIdAnaliza, valoriIdValoare);
        valoareAnalizeService.deleteValoareAnalize(id);
    }

}
