package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Service.MedicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "api/medic")
public class MedicController {
    private final MedicService medicService;

    @Autowired
    public MedicController(MedicService medicService) {
        this.medicService = medicService;
    }

    @GetMapping
    public List<Medic> getMedici() {
        return medicService.getMedici();
    }

    @GetMapping(path = "/specializare")
    public List<Medic> getMediciBySpecializare(@RequestParam(required = false) String specializare) {
        List<Medic> medici = medicService.findBySpecializare(specializare);
        return medici;
    }

    @GetMapping(path = "{idMedic}")
    public Medic getMedicById(@PathVariable("idMedic") Long idMedic) {
        return medicService.getMedicById(idMedic);
    }

    @PostMapping
    public Medic addMedic(@Valid @RequestBody Medic medic) {
        medicService.addMedic(medic);
        return medic;
    }

    @DeleteMapping(path = "{idMedic}")
    public void deleteMedic(@PathVariable("idMedic") Long idMedic) {
        medicService.deleteMedic(idMedic);
    }

    @PutMapping(path = "{idMedic}")
    public void updateMedic(@PathVariable("idMedic") Long idMedic, @RequestParam(required = false) String numeMedic, @RequestParam(required = false) String prenumeMedic, @RequestParam(required = false) String emailMedic, @RequestParam(required = false) String telefonMedic, @RequestParam(required = false) String parolaMedic, @RequestParam(required = false) Integer experienta) {
        medicService.updateMedic(idMedic, numeMedic, prenumeMedic, telefonMedic, emailMedic, parolaMedic, experienta);
    }
}
