package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Service.ConsultatieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/consultatie")
public class ConsultatieController {
    private static final Logger logger = LoggerFactory.getLogger(ConsultatieController.class);
    private final ConsultatieService consultatieService;


    @Autowired
    public ConsultatieController(ConsultatieService consultatieService) {
        this.consultatieService = consultatieService;
    }

    @GetMapping
    public List<Consultatie> getConsultatii(@RequestParam(required = false) Long medicId, @RequestParam(required = false) Long pacientId) {
        if (pacientId == null) {
            List<Consultatie> consultatii = consultatieService.findByMedicId(medicId);
            for (Consultatie consultatie : consultatii) {
                Pacient pacient = consultatie.getPacient();
                String numePacient = pacient != null ? pacient.getNumePacient() : "Unknown";
                String prenumePacient = pacient != null ? pacient.getPrenumePacient() : "Unknown";
                consultatie.setNumePacient(numePacient);
                consultatie.setPrenumePacient(prenumePacient);
            }
            return consultatii;
        } else if (medicId == null) {
            List<Consultatie> consultatii = consultatieService.findByPacientId(pacientId);
            for (Consultatie consultatie : consultatii) {
                Medic medic = consultatie.getMedic();
                String numeMedic = medic != null ? medic.getNumeMedic() : "Unknown";
                String prenumeMedic = medic != null ? medic.getPrenumeMedic() : "Unknown";
                consultatie.setNumeMedic(numeMedic);
                consultatie.setPrenumeMedic(prenumeMedic);
            }
            return consultatii;
        }
        return consultatieService.getConsultatii();
    }

    @PostMapping
    public void addConsultatie(@RequestBody Consultatie consultatie) {
        consultatieService.addConsultatie(consultatie);
    }

    @DeleteMapping(path = "{consultatieId}")
    public void deleteConsultatie(@PathVariable("consultatieId") Long consultatieId) {
        consultatieService.deleteConsultatie(consultatieId);
    }
}

