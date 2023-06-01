package com.backend.budgetboss.manualtransaction.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ManualTransactionResponseDTO {
    private Long id;
    private String name;
    private LocalDate date;
    private Double amount;
    private List<String> category = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
        return "ManualTransactionResponseDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                ", category=" + category.size() +
                '}';
    }
}
