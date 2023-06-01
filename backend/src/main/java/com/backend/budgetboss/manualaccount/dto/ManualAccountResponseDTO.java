package com.backend.budgetboss.manualaccount.dto;

import com.backend.budgetboss.manualaccount.ManualAccount;
import com.backend.budgetboss.manualaccount.ManualAccountType;

public class ManualAccountResponseDTO {
    private Long id;
    private String institutionName;
    private String name;
    private Double balance;
    private ManualAccountType type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
        return "ManualAccountResponse{" +
                "id=" + id +
                ", institutionName='" + institutionName + '\'' +
                ", name='" + name + '\'' +
                ", balance=" + balance +
                ", type=" + type +
                '}';
    }
}
