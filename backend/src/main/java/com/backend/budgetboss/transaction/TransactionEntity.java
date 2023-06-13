package com.backend.budgetboss.transaction;

import com.backend.budgetboss.account.Account;
import com.plaid.client.model.Transaction;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "transactions")
public class TransactionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Double amount;
  private String isoCurrencyCode;
  private List<String> category = new ArrayList<>();
  private LocalDate date;
  private String name;
  private String merchantName;
  private Boolean pending;
  private String paymentChannel;
  private String transactionId;

  @ManyToOne
  @JoinColumn(name = "account_id")
  private Account account;

  public TransactionEntity() {
  }

  public TransactionEntity(Transaction transaction, Account account) {
    this.amount = transaction.getAmount();
    this.isoCurrencyCode = transaction.getIsoCurrencyCode();
    this.category = transaction.getCategory();
    this.date = transaction.getDate();
    this.name = transaction.getName();
    this.merchantName = transaction.getMerchantName();
    this.pending = transaction.getPending();
    this.paymentChannel = transaction.getPaymentChannel().getValue();
    this.transactionId = transaction.getTransactionId();
    this.account = account;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public String getIsoCurrencyCode() {
    return isoCurrencyCode;
  }

  public void setIsoCurrencyCode(String isoCurrencyCode) {
    this.isoCurrencyCode = isoCurrencyCode;
  }

  public List<String> getCategory() {
    return category;
  }

  public void setCategory(List<String> category) {
    this.category = category;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getMerchantName() {
    return merchantName;
  }

  public void setMerchantName(String merchantName) {
    this.merchantName = merchantName;
  }

  public Boolean getPending() {
    return pending;
  }

  public void setPending(Boolean pending) {
    this.pending = pending;
  }

  public String getPaymentChannel() {
    return paymentChannel;
  }

  public void setPaymentChannel(String paymentChannel) {
    this.paymentChannel = paymentChannel;
  }

  public String getTransactionId() {
    return transactionId;
  }

  public void setTransactionId(String transactionId) {
    this.transactionId = transactionId;
  }

  public Account getAccount() {
    return account;
  }

  public void setAccount(Account account) {
    this.account = account;
  }

  @Override
  public boolean equals(Object o) {
      if (this == o) {
          return true;
      }
      if (o == null || getClass() != o.getClass()) {
          return false;
      }
    TransactionEntity that = (TransactionEntity) o;
    return Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "TransactionEntity{" +
        "id=" + id +
        ", amount=" + amount +
        ", isoCurrencyCode='" + isoCurrencyCode + '\'' +
        ", category=" + category +
        ", date=" + date +
        ", name='" + name + '\'' +
        ", merchantName='" + merchantName + '\'' +
        ", pending=" + pending +
        ", paymentChannel='" + paymentChannel + '\'' +
        ", transactionId='" + transactionId + '\'' +
        ", account=" + account.getName() +
        '}';
  }
}
