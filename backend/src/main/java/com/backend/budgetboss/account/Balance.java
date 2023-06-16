package com.backend.budgetboss.account;

import com.plaid.client.model.AccountBalance;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "balances")
public class Balance {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private BigDecimal available;
  private BigDecimal current;
  private String isoCurrencyCode;
  private BigDecimal balanceLimit;
  private String unofficialCurrencyCode;

  @OneToOne(mappedBy = "balances")
  private Account account;

  public Balance() {
  }

  public Balance(AccountBalance accountBalance) {
    if (accountBalance.getAvailable() != null) {
      this.available = BigDecimal.valueOf(accountBalance.getAvailable());
    }

    if (accountBalance.getCurrent() != null) {
      this.current = BigDecimal.valueOf(accountBalance.getCurrent());
    }

    if (accountBalance.getLimit() != null) {
      this.balanceLimit = BigDecimal.valueOf(accountBalance.getLimit());
    }

    this.isoCurrencyCode = accountBalance.getIsoCurrencyCode();
    this.unofficialCurrencyCode = accountBalance.getUnofficialCurrencyCode();
  }


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public BigDecimal getAvailable() {
    return available;
  }

  public void setAvailable(BigDecimal available) {
    this.available = available;
  }

  public BigDecimal getCurrent() {
    return current;
  }

  public void setCurrent(BigDecimal current) {
    this.current = current;
  }

  public String getIsoCurrencyCode() {
    return isoCurrencyCode;
  }

  public void setIsoCurrencyCode(String isoCurrencyCode) {
    this.isoCurrencyCode = isoCurrencyCode;
  }

  public BigDecimal getBalanceLimit() {
    return balanceLimit;
  }

  public void setBalanceLimit(BigDecimal balanceLimit) {
    this.balanceLimit = balanceLimit;
  }

  public String getUnofficialCurrencyCode() {
    return unofficialCurrencyCode;
  }

  public void setUnofficialCurrencyCode(String unofficialCurrencyCode) {
    this.unofficialCurrencyCode = unofficialCurrencyCode;
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
    Balance balance = (Balance) o;
    return Objects.equals(id, balance.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "Balance{" +
        "id=" + id +
        ", available='" + available + '\'' +
        ", current='" + current + '\'' +
        ", isoCurrencyCode='" + isoCurrencyCode + '\'' +
        ", balanceLimit='" + balanceLimit + '\'' +
        ", unofficialCurrencyCode='" + unofficialCurrencyCode + '\'' +
        ", account=" + account.getName() +
        '}';
  }
}
