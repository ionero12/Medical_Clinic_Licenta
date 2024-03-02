package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.Specializare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpecializareRepository extends JpaRepository<Specializare, Long> {
    @Query("SELECT s FROM Specializare s WHERE s.numeSpecializare = ?1")
    Optional<Specializare> findSpecializareByNume(String nume);
}
