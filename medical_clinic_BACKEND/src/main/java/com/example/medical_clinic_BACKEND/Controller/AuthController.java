package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Medic;
import com.example.medical_clinic_BACKEND.Model.Pacient;
import com.example.medical_clinic_BACKEND.Service.MedicService;
import com.example.medical_clinic_BACKEND.Service.PacientService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("api/login")
public class AuthController {

    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final PacientService pacientService;
    private final MedicService medicService;

    private final Map<String, String> sessionMap = new ConcurrentHashMap<>();

    public AuthController(PacientService pacientService, MedicService medicService) {
        this.pacientService = pacientService;
        this.medicService = medicService;
    }

    @CrossOrigin(origins = "http://192.168.1.128:3000")
    @PostMapping("/pacient")
    public ResponseEntity<?> loginPacient(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        String emailPacient = credentials.get("emailPacient");
        String parolaPacient = credentials.get("parolaPacient");

        if (pacientService.isValidCredentials(emailPacient, parolaPacient)) {
            Pacient pacient = pacientService.getPacientByEmail(emailPacient);

            String sessionId = UUID.randomUUID().toString();
            sessionMap.put(sessionId, emailPacient);

            String jwtToken = Jwts.builder()
                    .setSubject(emailPacient)
                    .claim("sessionId", sessionId)
                    .setExpiration(new Date(System.currentTimeMillis() + 15 * 60000)) // 15 min
                    .signWith(key).compact();

            String refreshToken = Jwts.builder()
                    .setSubject(emailPacient)
                    .claim("sessionId", sessionId)
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60000)) // 60 min
                    .signWith(key).compact();

            // Set JWT token in HttpOnly cookie
            Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setMaxAge(15 * 60); // 15 minutes
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);

            // Set Refresh token in HttpOnly cookie
            Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
            refreshCookie.setHttpOnly(true);
            refreshCookie.setMaxAge(60 * 60); // 60 minutes
            refreshCookie.setPath("/");
            response.addCookie(refreshCookie);

            // Manually add SameSite attribute
            response.addHeader("Set-Cookie", "jwtToken=" + jwtToken + "; HttpOnly; Max-Age=" + (15 * 60) + "; Path=/; SameSite=Strict");
            response.addHeader("Set-Cookie", "refreshToken=" + refreshToken + "; HttpOnly; Max-Age=" + (60 * 60) + "; Path=/; SameSite=Strict");

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("pacient", pacient);

            return ResponseEntity.ok(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/medic")
    public ResponseEntity<?> loginMedic(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        String emailMedic = credentials.get("emailMedic");
        String parolaMedic = credentials.get("parolaMedic");
        if (medicService.isValidCredentials(emailMedic, parolaMedic)) {
            Medic medic = medicService.findByEmail(emailMedic);

            String sessionId = UUID.randomUUID().toString();
            sessionMap.put(sessionId, emailMedic);

            String jwtToken = Jwts.builder()
                    .setSubject(emailMedic)
                    .claim("sessionId", sessionId)
                    .setExpiration(new Date(System.currentTimeMillis() + 15 * 60000)) // 15 min
                    .signWith(key).compact();

            String refreshToken = Jwts.builder()
                    .setSubject(emailMedic)
                    .claim("sessionId", sessionId)
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60000)) // 60 min
                    .signWith(key).compact();

            // Set JWT token in HttpOnly cookie
            Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setMaxAge(15 * 60); // 15 minutes
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);

            // Set Refresh token in HttpOnly cookie
            Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
            refreshCookie.setHttpOnly(true);
            refreshCookie.setMaxAge(60 * 60); // 60 minutes
            refreshCookie.setPath("/");
            response.addCookie(refreshCookie);

            // Manually add SameSite attribute
            response.addHeader("Set-Cookie", "jwtToken=" + jwtToken + "; HttpOnly; Max-Age=" + (15 * 60) + "; Path=/; SameSite=Strict");
            response.addHeader("Set-Cookie", "refreshToken=" + refreshToken + "; HttpOnly; Max-Age=" + (60 * 60) + "; Path=/; SameSite=Strict");

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("medic", medic);

            return ResponseEntity.ok(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Refresh token called");
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token found");
        }

        try {
            var claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(refreshToken).getBody();

            String email = claims.getSubject();
            String sessionId = claims.get("sessionId", String.class);

            if (!sessionMap.containsKey(sessionId) || !sessionMap.get(sessionId).equals(email)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid session");
            }

            System.out.println("email din token: " + email);

            String jwtToken = Jwts.builder()
                    .setSubject(email)
                    .claim("sessionId", sessionId)
                    .setExpiration(new Date(System.currentTimeMillis() + 15 * 60000)) // 15 min
                    .signWith(key).compact();

            Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setMaxAge(15 * 60); // 15 minutes
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);

            // Manually add SameSite attribute
            response.addHeader("Set-Cookie", "jwtToken=" + jwtToken + "; HttpOnly; Max-Age=" + (15 * 60) + "; Path=/; SameSite=Strict");

            return ResponseEntity.ok().build();
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired");
        } catch (Exception e) {
            System.err.println("Error parsing refresh token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error parsing refresh token");
        }
    }
}
