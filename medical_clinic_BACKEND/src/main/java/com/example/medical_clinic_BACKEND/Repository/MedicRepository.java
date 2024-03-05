package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.Medic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicRepository extends JpaRepository<Medic, Long> {
    @Query("SELECT m FROM Medic m WHERE m.cnpMedic = ?1")
    Optional<Medic> findMedicByCnp(String cnp);

    @Query("SELECT m FROM Medic m WHERE m.emailMedic = ?1")
    Optional<Medic> findByEmailMedic(String email);
}