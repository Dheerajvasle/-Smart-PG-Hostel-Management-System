package com.dheeraj.smartpg.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dheeraj.smartpg.model.Payment;
import com.dheeraj.smartpg.repository.PaymentRepository;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    @PostMapping
public Payment addPayment(@RequestBody Payment payment) {
    return paymentRepository.save(payment);
}
@PutMapping("/{id}")
public Payment updatePayment(@PathVariable Long id, @RequestBody Payment payment) {

    Payment existingPayment = paymentRepository.findById(id).orElseThrow();

    existingPayment.setTenantId(payment.getTenantId());
    existingPayment.setAmount(payment.getAmount());
    existingPayment.setPaymentDate(payment.getPaymentDate());
    existingPayment.setPaymentMonth(payment.getPaymentMonth());
    existingPayment.setPaymentStatus(payment.getPaymentStatus());

    return paymentRepository.save(existingPayment);
}
@DeleteMapping("/{id}")
public String deletePayment(@PathVariable Long id) {
    paymentRepository.deleteById(id);
    return "Payment deleted successfully";
}
}