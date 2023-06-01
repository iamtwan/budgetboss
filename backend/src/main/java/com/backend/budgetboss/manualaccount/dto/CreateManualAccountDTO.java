package com.backend.budgetboss.manualaccount.dto;

import com.backend.budgetboss.manualaccount.ManualAccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateManualAccountDTO {
    @NotBlank(message = "Institution name is required")
    private String institutionName;

    @NotBlank(message = "Account name is required")
    private String name;

    @NotNull(message = "Balance is required")
    private Double balance;

    @NotNull(message = "Account type is required")
    private ManualAccountType type;

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public ManualAccountType getType() {
        return type;
    }

    public void setType(ManualAccountType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "CreateManualAccountDTO{" +
                "institutionName='" + institutionName + '\'' +
                ", name='" + name + '\'' +
                ", balance=" + balance +
                ", type=" + type +
                '}';
    }
}
