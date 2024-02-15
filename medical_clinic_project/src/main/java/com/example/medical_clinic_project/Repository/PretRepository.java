package com.example.medical_clinic_project.Repository;

import com.example.medical_clinic_project.Model.Pret;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PretRepository extends JpaRepository<Pret, Integer> {
}
