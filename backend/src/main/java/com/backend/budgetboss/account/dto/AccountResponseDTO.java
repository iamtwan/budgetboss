package com.backend.budgetboss.account.dto;

import com.backend.budgetboss.account.Account;
import com.plaid.client.model.AccountType;

public class AccountResponseDTO {
    private Long id;
    private String mask;
    private String name;
    private String officialName;
    private AccountType type;
    private BalanceResponseDTO balances;

    public AccountResponseDTO(Account account) {
        this.id = account.getId();
        this.mask = account.getMask();
        this.name = account.getName();
        this.officialName = account.getOfficialName();
        this.type = account.getType();
        this.balances = new BalanceResponseDTO(account.getBalances());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMask() {
        return mask;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOfficialName() {
        return officialName;
    }

    public void setOfficialName(String officialName) {
        this.officialName = officialName;
    }

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public BalanceResponseDTO getBalances() {
        return balances;
    }

    public void setBalances(BalanceResponseDTO balances) {
        this.balances = balances;
    }

    @Override
    public String toString() {
        return "AccountResponseDTO{" +
                "id=" + id +
                ", mask='" + mask + '\'' +
                ", name='" + name + '\'' +
                ", officialName='" + officialName + '\'' +
                ", type=" + type +
                ", balances=" + balances +
                '}';
    }
}
