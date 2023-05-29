package com.backend.budgetboss.item.dto;

import com.plaid.client.model.AccountBase;

import java.util.List;

public class ItemResponseDTO {
    private Long id;
    private String name;
    private List<AccountBase> accounts;

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

    public List<AccountBase> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<AccountBase> accounts) {
        this.accounts = accounts;
    }

    @Override
    public String toString() {
        return "ItemResponseDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", accounts=" + accounts.size() +
                '}';
    }
}
