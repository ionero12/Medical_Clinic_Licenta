package com.example.medical_clinic_BACKEND.Model;

public class PaymentRequest {
    private Long consultatieId;
    private Long amount;
    private String currency;
    private String token;
    private String description;

    public PaymentRequest() {
    }

    public PaymentRequest(Long consultatieId, Long amount, String currency, String token, String description) {
        this.consultatieId = consultatieId;
        this.amount = amount;
        this.currency = currency;
        this.token = token;
        this.description = description;
    }

    public Long getConsultatieId() {
        return consultatieId;
    }

    public void setConsultatieId(Long consultatieId) {
        this.consultatieId = consultatieId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
