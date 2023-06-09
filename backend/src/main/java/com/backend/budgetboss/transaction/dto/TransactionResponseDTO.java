package com.backend.budgetboss.transaction.dto;

import com.plaid.client.model.PersonalFinanceCategory;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class TransactionResponseDTO {

  private Long id;
  private BigDecimal amount;
  private String isoCurrencyCode;
  private String category;
  private LocalDate date;
  private String name;
  private String merchantName;
  private Boolean pending;
  private String paymentChannel;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public String getIsoCurrencyCode() {
    return isoCurrencyCode;
  }

  public void setIsoCurrencyCode(String isoCurrencyCode) {
    this.isoCurrencyCode = isoCurrencyCode;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
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

  @Override
  public String toString() {
    return "TransactionResponseDTO{" +
        "id=" + id +
        ", amount=" + amount +
        ", isoCurrencyCode='" + isoCurrencyCode + '\'' +
        ", category=" + category +
        ", date=" + date +
        ", name='" + name + '\'' +
        ", merchantName='" + merchantName + '\'' +
        ", pending=" + pending +
        ", paymentChannel='" + paymentChannel + '\'' +
        '}';
  }
}
