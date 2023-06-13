package com.backend.budgetboss.manualaccount.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class UpdateManualAccountDTO {
    @NotBlank(message = "Account name is required")
    private String name;

    @NotNull(message = "Balance is required")
    private BigDecimal balance;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "UpdateManualAccountDTO{" +
                "name='" + name + '\'' +
                ", balance=" + balance +
                '}';
    }
}
