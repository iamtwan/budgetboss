package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualinstitution.ManualInstitution;
import com.backend.budgetboss.manualtransaction.ManualTransaction;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "manual_accounts")
public class ManualAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Account name is required")
    private String name;

    @Column(precision = 19, scale = 2)
    @NotNull(message = "Balance is required")
    private BigDecimal balance;

    @NotNull(message = "Account type is required")
    private ManualAccountType type;

    @OneToMany(mappedBy = "manualAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ManualTransaction> manualTransactions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "manual_institution_id")
    private ManualInstitution manualInstitution;

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

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public List<ManualTransaction> getManualTransactions() {
        return manualTransactions;
    }

    public void setManualTransactions(List<ManualTransaction> manualTransactions) {
        this.manualTransactions = manualTransactions;
    }

    public ManualInstitution getManualInstitution() {
        return manualInstitution;
    }

    public void setManualInstitution(ManualInstitution manualInstitution) {
        this.manualInstitution = manualInstitution;
    }

    public ManualAccountType getType() {
        return type;
    }

    public void setType(ManualAccountType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ManualAccount that = (ManualAccount) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "ManualAccount{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", balance=" + balance +
                ", type=" + type +
                ", manualTransactions=" + manualTransactions.size() +
                ", manualInstitution=" + manualInstitution.getName() +
                '}';
    }
}
