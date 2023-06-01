package com.backend.budgetboss.manualtransaction.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CreateManualTransactionDTO {
    @NotBlank(message = "Transaction name is required")
    private String name;

    @NotNull(message = "Date is required")
    private LocalDate date = LocalDate.now();

    @NotNull(message = "Amount is required")
    private Double amount = 0.0;

    private List<String> category = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "CreateManualTransactionDTO{" +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                ", category=" + category +
                '}';
    }
}
