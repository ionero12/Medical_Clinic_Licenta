package com.example.medical_clinic_BACKEND.Service;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import com.example.medical_clinic_BACKEND.Model.Payment;
import com.example.medical_clinic_BACKEND.Model.PaymentRequest;
import com.example.medical_clinic_BACKEND.Repository.ConsultatieRepository;
import com.example.medical_clinic_BACKEND.Repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private ConsultatieRepository consultatieRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public Payment processPayment(PaymentRequest paymentRequest) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        ChargeCreateParams params = ChargeCreateParams.builder()
                .setAmount(paymentRequest.getAmount())
                .setCurrency(paymentRequest.getCurrency())
                .setSource(paymentRequest.getToken())
                .setDescription("Charge for " + paymentRequest.getDescription())
                .build();

        Charge charge = Charge.create(params);

        Consultatie consultatie = consultatieRepository.findById(paymentRequest.getConsultatieId())
                .orElseThrow(() -> new EntityNotFoundException("Consultatie not found"));

        Payment payment = new Payment();
        payment.setConsultatie(consultatie);

//        payment.setConsultatieId(paymentRequest.getConsultatieId());
        payment.setAmount(new BigDecimal(charge.getAmount()).divide(new BigDecimal(100)));
        payment.setCurrency(charge.getCurrency());
        payment.setPaymentStatus(charge.getStatus());
        payment.setPaymentMethod(charge.getPaymentMethod());
        payment.setTransactionId(charge.getId());
        payment.setPaymentDate(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    public List<Payment> getPaymentsByConsultatie(Long consultatieId) {
        return paymentRepository.findByConsultatie_idConsultatie(consultatieId);
    }
}
