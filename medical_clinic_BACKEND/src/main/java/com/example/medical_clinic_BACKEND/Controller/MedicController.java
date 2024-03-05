package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Service.MedicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping
    public void addMedic(@RequestBody Medic medic) {
        medicService.addMedic(medic);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public String loginMedic(@RequestBody Map<String, String> credentials) {
        String emailMedic = credentials.get("emailMedic");
        String parolaMedic = credentials.get("parolaMedic");
        if (medicService.isValidCredentials(emailMedic, parolaMedic)) {
            return "Login successful!";
        } else {
            return "Invalid credentials. Please try again.";
        }
    }

    @DeleteMapping(path = "{medicId}")
    public void deleteMedic(@PathVariable("medicId") Long medicId) {
        medicService.deleteMedic(medicId);
    }

    @PutMapping(path = "{medicId}")
    public void updateMedic(@PathVariable("medicId") Long medicId, @RequestParam(required = false) String numeMedic, @RequestParam(required = false) String prenumeMedic, @RequestParam(required = false) String specializare, @RequestParam(required = false) String emailMedic, @RequestParam(required = false) String telefonMedic, @RequestParam(required = false) String parolaMedic, @RequestParam(required = false) String cnpMedic) {
        medicService.updateMedic(medicId, numeMedic, prenumeMedic, cnpMedic, telefonMedic, emailMedic, parolaMedic, specializare);
    }
}
