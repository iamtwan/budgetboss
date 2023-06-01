package com.backend.budgetboss.account;

import com.plaid.client.model.AccountBalance;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "balances")
public class Balance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double available;
    private Double current;
    private String isoCurrencyCode;
    private Double balanceLimit;
    private String unofficialCurrencyCode;

    @OneToOne(mappedBy = "balances")
    private Account account;

    public Balance() {

    }

    public Balance(AccountBalance accountBalance) {
        this.available = accountBalance.getAvailable();
        this.current = accountBalance.getCurrent();
        this.isoCurrencyCode = accountBalance.getIsoCurrencyCode();
        this.balanceLimit = accountBalance.getLimit();
        this.unofficialCurrencyCode = accountBalance.getUnofficialCurrencyCode();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAvailable() {
        return available;
    }

    public void setAvailable(Double available) {
        this.available = available;
    }

    public Double getCurrent() {
        return current;
    }

    public void setCurrent(Double current) {
        this.current = current;
    }

    public String getIsoCurrencyCode() {
        return isoCurrencyCode;
    }

    public void setIsoCurrencyCode(String isoCurrencyCode) {
        this.isoCurrencyCode = isoCurrencyCode;
    }

    public Double getBalanceLimit() {
        return balanceLimit;
    }

    public void setBalanceLimit(Double balanceLimit) {
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
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
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
