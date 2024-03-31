package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.Diagnostic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosticRepository extends JpaRepository<Diagnostic, Long> {

    @Query("SELECT d FROM Diagnostic d WHERE d.pacient.idPacient = ?1")
    List<Diagnostic> findByIdPacient(Long idPacient);
}
