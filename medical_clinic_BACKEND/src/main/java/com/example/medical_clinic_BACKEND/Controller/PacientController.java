package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Service.ConsultatieService;
import com.example.medical_clinic_BACKEND.Service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/pacient")
public class PacientController {
    private final PacientService pacientService;
    private final ConsultatieService consultatieService;

    @Autowired
    public PacientController(PacientService pacientService, ConsultatieService consultatieService) {
        this.pacientService = pacientService;
        this.consultatieService = consultatieService;
    }

    @GetMapping
    public List<Pacient> getPacienti(@RequestParam(required = false) Long medicId) {
        if (medicId == null) return pacientService.getPacienti();
        else {
            List<Consultatie> consultatii = consultatieService.findByMedicId(medicId);
            if (consultatii != null) {
                return consultatii.stream().map(Consultatie::getPacient).distinct().collect(Collectors.toList());
            } else {
                return new ArrayList<>();
            }
        }
    }


    @GetMapping(path = "{pacientId}")
    public Pacient getPacientById(@PathVariable("pacientId") Long pacientId) {
        return pacientService.getPacientById(pacientId);
    }

    @PostMapping
    public ResponseEntity<Pacient> addPacient(@RequestBody Pacient pacient) {
        pacientService.addPacient(pacient);
        return ResponseEntity.ok(pacient);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<Pacient> loginPacient(@RequestBody Map<String, String> credentials) {
        String emailPacient = credentials.get("emailPacient");
        String parolaPacient = credentials.get("parolaPacient");
        if (pacientService.isValidCredentials(emailPacient, parolaPacient)) {
            Pacient pacient = pacientService.findByEmail(emailPacient);
            return ResponseEntity.ok(pacient);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping(path = "{pacientId}")
    public void deletePacient(@PathVariable("pacientId") Long pacientId) {
        pacientService.deletePacient(pacientId);
    }

    @PutMapping(path = "{pacientId}")
    public void updatePacient(@PathVariable("pacientId") Long pacientId, @RequestParam(required = false) String numePacient, @RequestParam(required = false) String prenumePacient, @RequestParam(required = false) String emailPacient, @RequestParam(required = false) String telefonPacient, @RequestParam(required = false) String parolaPacient, @RequestParam(required = false) Character asigurat, @RequestParam(required = false) Character abonamentPacient, @RequestParam(required = false) Double inaltimePacient, @RequestParam(required = false) Double greutatePacient, @RequestParam(required = false) Integer varstaPacient) {
        pacientService.updatePacient(pacientId, numePacient, prenumePacient, telefonPacient, emailPacient, parolaPacient, inaltimePacient, greutatePacient, abonamentPacient, asigurat, varstaPacient);
    }
}
