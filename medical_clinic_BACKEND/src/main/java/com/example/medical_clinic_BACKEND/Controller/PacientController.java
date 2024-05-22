package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Service.ConsultatieService;
import com.example.medical_clinic_BACKEND.Service.PacientService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.crypto.SecretKey;
import java.util.*;
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
    public ResponseEntity<?> addPacient(@Valid @RequestBody Pacient pacient) {
        pacientService.addPacient(pacient);
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String jwtToken = Jwts.builder()
                .setSubject(pacient.getEmailPacient())
                .setExpiration(new Date(System.currentTimeMillis() + 900000))
                .signWith(key)
                .compact();

        Map<String, Object> response = new HashMap<>();
        response.put("jwtToken", jwtToken);
        response.put("pacient", pacient);

        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://192.168.1.128:3000")
    @PostMapping("/login")
    public ResponseEntity<?> loginPacient(@RequestBody Map<String, String> credentials) {
        String emailPacient = credentials.get("emailPacient");
        String parolaPacient = credentials.get("parolaPacient");
        if (pacientService.isValidCredentials(emailPacient, parolaPacient)) {
            Pacient pacient = pacientService.getPacientByEmail(emailPacient);

            SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

            String jwtToken = Jwts.builder()
                    .setSubject(emailPacient)
                    .setExpiration(new Date(System.currentTimeMillis() + 900000))
                    .signWith(key)
                    .compact();

            Map<String, Object> response = new HashMap<>();
            response.put("jwtToken", jwtToken);
            response.put("pacient", pacient);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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
