package com.backend.budgetboss.item.dto;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.account.dto.AccountResponseDTO;
import com.backend.budgetboss.item.Status;
import java.util.ArrayList;
import java.util.List;

public class ItemResponseDTO {

  private Long id;
  private String name;
  private Status status;
  private List<AccountResponseDTO> accounts;

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

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public List<AccountResponseDTO> getAccounts() {
    return accounts;
  }

  public void setAccounts(List<Account> accounts) {
    List<AccountResponseDTO> newAccounts = new ArrayList<>();

    for (Account account : accounts) {
      newAccounts.add(new AccountResponseDTO(account));
    }

    this.accounts = newAccounts;
  }

  @Override
  public String toString() {
    return "ItemResponseDTO{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", status=" + status +
        ", accounts=" + accounts +
        '}';
  }
}
