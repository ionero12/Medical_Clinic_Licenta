package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Diagnostic;
import com.example.medical_clinic_BACKEND.Service.DiagnosticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/diagnostic")
public class DiagnosticController {
    private final DiagnosticService diagnosticService;

    @Autowired
    public DiagnosticController(DiagnosticService diagnosticService) {
        this.diagnosticService = diagnosticService;
    }

    @GetMapping
    public List<Diagnostic> getDiagnostice() {
        return diagnosticService.getDiagnostic();
    }

    @GetMapping(path = "/pacient")
    public List<Diagnostic> getDiagnostice(@RequestParam(required = false) Long idPacient) {
        return diagnosticService.getDiagnosticByIdPacient(idPacient);
    }

    @PostMapping
    public ResponseEntity<Diagnostic> addDiagnostic(@RequestBody Diagnostic diagnostic) {
        diagnosticService.addDiagnostic(diagnostic);
        return ResponseEntity.ok(diagnostic);
    }

    @DeleteMapping(path = "{diagnosticId}")
    public void deleteDiagnostic(@PathVariable("diagnosticId") Long diagnosticId) {
        diagnosticService.deleteDiagnostic(diagnosticId);
    }
}
