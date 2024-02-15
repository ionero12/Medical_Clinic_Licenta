package com.example.medical_clinic_project.Repository;

import com.example.medical_clinic_project.Model.Consultatie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultatieRepository extends JpaRepository<Consultatie, Integer> {
}
