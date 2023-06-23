package com.backend.budgetboss.account.helper;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.account.AccountRepository;
import com.backend.budgetboss.account.exception.AccountNotFoundException;
import com.backend.budgetboss.user.User;
import org.springframework.stereotype.Component;

@Component
public class AccountHelper {

  private final AccountRepository accountRepository;

  public AccountHelper(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public Account getAccount(Long id) {
    return accountRepository.findById(id)
        .orElseThrow(() -> new AccountNotFoundException(id));
  }

  public Account getAccountByAccountId(String accountId) {
    return accountRepository.findByAccountId(accountId)
        .orElseThrow(() -> new AccountNotFoundException(accountId));
  }

  public Account getAccountByUserAndId(User user, Long id) {
    return accountRepository.findByItem_UserAndId(user, id)
        .orElseThrow(() -> new AccountNotFoundException(id));
  }
}
