package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Valoare;
import com.example.medical_clinic_project.Service.ValoareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/valoare")
public class ValoareController {
    private final ValoareService valoareService;

    @Autowired
    public ValoareController(ValoareService valoareService) {
        this.valoareService = valoareService;
    }

    @GetMapping
    public List<Valoare> getValori() {
        return valoareService.getValori();
    }


}
