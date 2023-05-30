package com.backend.budgetboss.account.util;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.account.AccountRepository;
import com.backend.budgetboss.account.exception.AccountNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AccountUtil {
    private final AccountRepository accountRepository;

    public AccountUtil(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account getAccount(String accountId) {
        return accountRepository.findByAccountId(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + accountId));
    }
}
