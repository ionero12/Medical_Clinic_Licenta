package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Service.ConsultatieService;
import com.example.medical_clinic_BACKEND.Service.PacientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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
    public List<Pacient> getPacienti() {
        return pacientService.getPacienti();
    }

    @GetMapping(path = "/medic")
    public List<Pacient> getPacientiByMedicId(@RequestParam(required = false) Long idMedic) {
        List<Consultatie> consultatii = consultatieService.findByIdMedic(idMedic);
        if (consultatii != null) {
            return consultatii.stream().map(Consultatie::getPacient).distinct().collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    @GetMapping(path = "/cnp")
    public Pacient getPacientByCnp(@RequestParam(required = false) String cnpPacient) {
        return pacientService.getPacientByCnp(cnpPacient);
    }

    @GetMapping(path = "{idPacient}")
    public Pacient getPacientById(@PathVariable("idPacient") Long idPacient) {
        return pacientService.getPacientById(idPacient);
    }

    @PostMapping
    public Pacient addPacient(@Valid @RequestBody Pacient pacient) {
        pacientService.addPacient(pacient);
        return pacient;
    }

    @DeleteMapping(path = "{idPacient}")
    public void deletePacient(@PathVariable("idPacient") Long idPacient) {
        pacientService.deletePacient(idPacient);
    }

    @PutMapping(path = "{idPacient}")
    public void updatePacient(@PathVariable("idPacient") Long idPacient, @RequestParam(required = false) String numePacient, @RequestParam(required = false) String prenumePacient, @RequestParam(required = false) String emailPacient, @RequestParam(required = false) String telefonPacient, @RequestParam(required = false) String parolaPacient, @RequestParam(required = false) Character asigurat, @RequestParam(required = false) Character abonamentPacient, @RequestParam(required = false) Double inaltimePacient, @RequestParam(required = false) Double greutatePacient, @RequestParam(required = false) Integer varstaPacient) {
        pacientService.updatePacient(idPacient, numePacient, prenumePacient, telefonPacient, emailPacient, parolaPacient, inaltimePacient, greutatePacient, abonamentPacient, asigurat, varstaPacient);
    }
}
