package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.ValoareAnalize;
import com.example.medical_clinic_BACKEND.Model.ValoareAnalizeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValoareAnalizeRepository extends JpaRepository<ValoareAnalize, ValoareAnalizeId> {
}
