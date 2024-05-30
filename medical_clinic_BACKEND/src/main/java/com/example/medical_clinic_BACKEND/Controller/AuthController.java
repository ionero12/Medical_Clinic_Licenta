package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Service.MedicService;
import com.example.medical_clinic_BACKEND.Service.PacientService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("api/login")
public class AuthController {

    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final PacientService pacientService;
    private final MedicService medicService;

    public AuthController(PacientService pacientService, MedicService medicService) {
        this.pacientService = pacientService;
        this.medicService = medicService;
    }

    @CrossOrigin(origins = "http://192.168.1.128:3000")
    @PostMapping("/pacient")
    public ResponseEntity<?> loginPacient(@RequestBody Map<String, String> credentials) {
        String emailPacient = credentials.get("emailPacient");
        String parolaPacient = credentials.get("parolaPacient");
        if (pacientService.isValidCredentials(emailPacient, parolaPacient)) {
            Pacient pacient = pacientService.getPacientByEmail(emailPacient);

            String jwtToken = Jwts.builder()
                    .setSubject(emailPacient)
                    .setExpiration(new Date(System.currentTimeMillis() + 15 * 60000)) //1 min
                    .signWith(key)
                    .compact();

            String refreshToken = Jwts.builder()
                    .setSubject(emailPacient)
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60000)) //3 min
                    .signWith(key)
                    .compact();

            Map<String, Object> response = new HashMap<>();
            response.put("jwtToken", jwtToken);
            response.put("refreshToken", refreshToken);
            response.put("pacient", pacient);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/medic")
    public ResponseEntity<?> loginMedic(@RequestBody Map<String, String> credentials) {
        String emailMedic = credentials.get("emailMedic");
        String parolaMedic = credentials.get("parolaMedic");
        if (medicService.isValidCredentials(emailMedic, parolaMedic)) {
            Medic medic = medicService.findByEmail(emailMedic);

            String jwtToken = Jwts.builder()
                    .setSubject(emailMedic)
                    .setExpiration(new Date(System.currentTimeMillis() + 15 * 60000)) //1 min
                    .signWith(key)
                    .compact();

            String refreshToken = Jwts.builder()
                    .setSubject(emailMedic)
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60000)) //3 min
                    .signWith(key)
                    .compact();

            Map<String, Object> response = new HashMap<>();
            response.put("jwtToken", jwtToken);
            response.put("refreshToken", refreshToken);
            response.put("medic", medic);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> tokenMap) {
        String refreshToken = tokenMap.get("refreshToken");
        try {
            var claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(refreshToken)
                    .getBody();

            String email = claims.getSubject();
            System.out.println("email din token: " + email);

            String jwtToken = Jwts.builder()
                    .setSubject(email)
                    .setExpiration(new Date(System.currentTimeMillis() + 15 * 60000)) // 1 min as the previous access token
                    .signWith(key)
                    .compact();

            Map<String, String> response = new HashMap<>();
            response.put("jwtToken", jwtToken);

            return ResponseEntity.ok(response);
        } catch (ExpiredJwtException e) {
            // Handle expired refresh token without printing error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired");
        } catch (Exception e) {
            // Handle other exceptions and log error message
            System.err.println("Error parsing refresh token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error parsing refresh token");
        }
    }
}


