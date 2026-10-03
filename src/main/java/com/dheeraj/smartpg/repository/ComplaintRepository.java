package com.dheeraj.smartpg.repository;

import com.dheeraj.smartpg.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}