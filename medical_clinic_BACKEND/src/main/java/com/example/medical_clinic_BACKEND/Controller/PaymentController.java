package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Payment;
import com.example.medical_clinic_BACKEND.Model.PaymentRequest;
import com.example.medical_clinic_BACKEND.Service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/charge")
    public ResponseEntity<?> chargeCard(@RequestBody PaymentRequest paymentRequest) {
        try {
            Payment payment = paymentService.processPayment(paymentRequest);
            return ResponseEntity.ok(payment);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/consultatie/{consultatieId}")
    public ResponseEntity<List<Payment>> getPaymentsByConsultatie(@PathVariable Long consultatieId) {
        List<Payment> payments = paymentService.getPaymentsByConsultatie(consultatieId);
        return ResponseEntity.ok(payments);
    }
}