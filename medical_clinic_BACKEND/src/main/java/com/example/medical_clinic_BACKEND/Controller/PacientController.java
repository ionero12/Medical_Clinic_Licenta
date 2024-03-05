package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/pacient")
public class PacientController {
    private final PacientService pacientService;

    @Autowired
    public PacientController(PacientService pacientService) {
        this.pacientService = pacientService;
    }

    @GetMapping
    public List<Pacient> getPacienti() {
        return pacientService.getPacienti();
    }

    @PostMapping
    public void addPacient(@RequestBody Pacient pacient) {
        pacientService.addPacient(pacient);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public String loginPacient(@RequestBody Map<String, String> credentials) {
        String emailPacient = credentials.get("emailPacient");
        String parolaPacient = credentials.get("parolaPacient");
        if (pacientService.isValidCredentials(emailPacient, parolaPacient)) {
            return "Login successful!";
        } else {
            return "Invalid credentials. Please try again.";
        }
    }

    @DeleteMapping(path = "{pacientId}")
    public void deletePacient(@PathVariable("pacientId") Long pacientId) {
        pacientService.deletePacient(pacientId);
    }

    @PutMapping(path = "{pacientId}")
    public void updatePacient(@PathVariable("pacientId") Long pacientId, @RequestParam(required = false) String numePacient, @RequestParam(required = false) String prenumePacient, @RequestParam(required = false) String emailPacient, @RequestParam(required = false) String telefonPacient, @RequestParam(required = false) String parolaPacient, @RequestParam(required = false) String cnpPacient, @RequestParam(required = false) Character asigurat, @RequestParam(required = false) Character abonamentPacient,@RequestParam(required = false) Double inaltimePacient, @RequestParam(required = false) Double greutatePacient, @RequestParam(required = false) Integer varstaPacient) {
        pacientService.updatePacient(pacientId, numePacient, prenumePacient, cnpPacient, telefonPacient, emailPacient, parolaPacient, inaltimePacient, greutatePacient, abonamentPacient, asigurat, varstaPacient);
    }
}
