package com.dheeraj.smartpg.repository;

import com.dheeraj.smartpg.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}