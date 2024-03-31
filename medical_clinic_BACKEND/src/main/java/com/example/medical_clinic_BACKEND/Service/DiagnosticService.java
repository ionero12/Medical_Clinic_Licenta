package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Diagnostic;
import com.example.medical_clinic_BACKEND.Repository.DiagnosticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagnosticService {
    private final DiagnosticRepository diagnosticRepository;

    @Autowired
    public DiagnosticService(DiagnosticRepository diagnosticRepository) {
        this.diagnosticRepository = diagnosticRepository;
    }

    public List<Diagnostic> getDiagnostic(Long idPacient) {
        if (idPacient != null) {
            return diagnosticRepository.findByIdPacient(idPacient);
        }
        return diagnosticRepository.findAll();
    }

    public void addDiagnostic(Diagnostic diagnostic) {
        diagnosticRepository.save(diagnostic);
    }

    public void deleteDiagnostic(Long diagnosticId) {
        boolean exists = diagnosticRepository.existsById(diagnosticId);
        if (!exists) {
            throw new IllegalStateException("Fisa medicala cu id-ul " + diagnosticId + " nu exista");
        }
        diagnosticRepository.deleteById(diagnosticId);
    }
}
