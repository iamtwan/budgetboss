package com.backend.budgetboss.account;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.transaction.TransactionEntity;
import com.plaid.client.model.AccountBase;
import com.plaid.client.model.AccountSubtype;
import com.plaid.client.model.AccountType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accountId;
    private String mask;
    private String name;
    private String officialName;
    private AccountType type;
    private AccountSubtype subtype;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "balance_id")
    private Balance balances;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransactionEntity> transactions = new ArrayList<>();

    public Account() {
    }

    public Account(AccountBase accountBase, Item item) {
        this.accountId = accountBase.getAccountId();
        this.mask = accountBase.getMask();
        this.name = accountBase.getName();
        this.officialName = accountBase.getOfficialName();
        this.type = accountBase.getType();
        this.subtype = accountBase.getSubtype();
        this.balances = new Balance(accountBase.getBalances());
        this.item = item;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
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

    public AccountSubtype getSubtype() {
        return subtype;
    }

    public void setSubtype(AccountSubtype subtype) {
        this.subtype = subtype;
    }

    public Balance getBalances() {
        return balances;
    }

    public void setBalances(Balance balances) {
        this.balances = balances;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public List<TransactionEntity> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<TransactionEntity> transactions) {
        this.transactions = transactions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return Objects.equals(id, account.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", accountId='" + accountId + '\'' +
                ", mask='" + mask + '\'' +
                ", name='" + name + '\'' +
                ", officialName='" + officialName + '\'' +
                ", type=" + type +
                ", subtype=" + subtype +
                ", balances id=" + balances.getId() +
                ", item=" + item.getInstitutionName() +
                ", transactions=" + transactions.size() +
                '}';
    }
}
