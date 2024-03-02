package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultatieRepository extends JpaRepository<Consultatie, Long> {
}
