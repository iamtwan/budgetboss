package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.manualaccount.ManualAccount;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "manual_transactions")
public class ManualTransaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Transaction name is required")
  private String name;

  @NotNull(message = "Date is required")
  private LocalDate date;

  @Column(precision = 19, scale = 2)
  @NotNull(message = "Amount is required")
  private BigDecimal amount;

  @NotBlank(message = "Category is required")
  private String category;

  @ManyToOne
  @JoinColumn(name = "manual_account_id")
  private ManualAccount manualAccount;

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

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public ManualAccount getManualAccount() {
    return manualAccount;
  }

  public void setManualAccount(ManualAccount manualAccount) {
    this.manualAccount = manualAccount;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ManualTransaction that = (ManualTransaction) o;
    return Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "ManualTransaction{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", date=" + date +
        ", amount=" + amount +
        ", category=" + category +
        ", manualAccount=" + manualAccount.getName() +
        '}';
  }
}
