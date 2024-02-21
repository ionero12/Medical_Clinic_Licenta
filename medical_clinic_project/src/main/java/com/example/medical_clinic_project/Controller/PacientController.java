package com.example.medical_clinic_project.Controller;

import com.example.medical_clinic_project.Model.Pacient;
import com.example.medical_clinic_project.Service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping(path = "{pacientId}")
    public void deletePacient(@PathVariable("pacientId") Long pacientId) {
        pacientService.deletePacient(pacientId);
    }

    @PutMapping(path = "{pacientId}")
    public void updatePacient(@PathVariable("pacientId") Long pacientId, @RequestParam(required = false) String numePacient, @RequestParam(required = false) String prenumePacient, @RequestParam(required = false) String emailPacient, @RequestParam(required = false) String telefonPacient, @RequestParam(required = false) String parolaPacient, @RequestParam(required = false) String cnpPacient, @RequestParam(required = false) char asigurat, @RequestParam(required = false) char abonamentPacient,@RequestParam(required = false) Double inaltimePacient, @RequestParam(required = false) Double greutatePacient) {
        pacientService.updatePacient(pacientId, numePacient, prenumePacient, cnpPacient, telefonPacient, emailPacient, parolaPacient, inaltimePacient, greutatePacient, abonamentPacient, asigurat);
    }
}
