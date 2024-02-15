package com.example.medical_clinic_project.Repository;

import com.example.medical_clinic_project.Model.Medic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicRepository extends JpaRepository<Medic, Integer> {
}
