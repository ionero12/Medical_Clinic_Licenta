package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.PretConsultatii;
import com.example.medical_clinic_project.Model.PretConsultatiiId;
import com.example.medical_clinic_project.Service.PretConsultatiiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/pret_consultatii")
public class PretConsultatiiController {

    private final PretConsultatiiService pretConsultatiiService;

    @Autowired
    public PretConsultatiiController(PretConsultatiiService pretConsultatiiService) {
        this.pretConsultatiiService = pretConsultatiiService;
    }

    @GetMapping
    public List<PretConsultatii> getPretConsultatii() {
        return pretConsultatiiService.getPretConsultatii();
    }

    @PostMapping
    public void addPretConsultatii(@RequestBody PretConsultatii pretConsultatii) {
        pretConsultatiiService.addPretConsultatii(pretConsultatii);
    }

    @DeleteMapping(path = "{preturiIdPret}/{consultatiiIdConsultatie}")
    public void deletePretConsultatii(@PathVariable("preturiIdPret") Long preturiIdPret, @PathVariable("consultatiiIdConsultatie") Long consultatiiIdConsultatie) {
        PretConsultatiiId id = new PretConsultatiiId(preturiIdPret, consultatiiIdConsultatie);
        pretConsultatiiService.detelePretConsultatii(id);
    }
}
