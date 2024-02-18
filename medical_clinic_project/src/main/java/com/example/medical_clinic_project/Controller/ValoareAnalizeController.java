package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.ValoareAnalize;
import com.example.medical_clinic_project.Service.ValoareAnalizeService;
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
    public List<ValoareAnalize> getValoareAnalize() {
        return valoareAnalizeService.getValoareAnalize();
    }

    @PostMapping
    public void addValoareAnalize(@RequestBody ValoareAnalize valoareAnalize) {
        valoareAnalizeService.addValoareAnalize(valoareAnalize);
    }


}
