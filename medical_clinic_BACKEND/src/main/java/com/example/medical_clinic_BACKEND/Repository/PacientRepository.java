package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.Pacient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacientRepository extends JpaRepository<Pacient, Long> {
    @Query("SELECT p FROM Pacient p WHERE p.cnpPacient = ?1")
    Optional<Pacient> findPacientByCnp(String cnp);
}
