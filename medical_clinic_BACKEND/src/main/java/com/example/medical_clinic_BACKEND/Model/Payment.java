package com.example.medical_clinic_BACKEND.Model;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.Currency;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_payment")
    private Long idPayment;

    @Column(name="amount", nullable = false)
    private BigDecimal amount;

    @Column(name="currency", nullable = false)
    private String currency;

    @Column(name="payment_status", nullable = false)
    private String paymentStatus;

    @Column(name="payment_method", nullable = false)
    private String paymentMethod;

    @Column(name="transaction_id", nullable = false)
    private String transactionId;

    @Column(name = "PAYMENT_DATE")
    private LocalDateTime paymentDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_CONSULTATIE", nullable = false)
    private Consultatie consultatie;

    public Payment() {
    }

    public Payment(Long idPayment, BigDecimal amount, String currency, String paymentStatus, String paymentMethod, String transactionId, LocalDateTime paymentDate, Consultatie consultatie) {
        this.idPayment = idPayment;
        this.amount = amount;
        this.currency = currency;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
        this.paymentDate = paymentDate;
        this.consultatie = consultatie;
    }

    public Long getIdPayment() {
        return idPayment;
    }

    public void setIdPayment(Long idPayment) {
        this.idPayment = idPayment;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Consultatie getConsultatie() {
        return consultatie;
    }

    public void setConsultatie(Consultatie consultatie) {
        this.consultatie = consultatie;
    }

    public Long getConsultatieId() {
        return this.consultatie != null ? this.consultatie.getIdConsultatie() : null;
    }

    public void setConsultatieId(Long id){
        this.consultatie.setIdConsultatie(id);
    }
}
