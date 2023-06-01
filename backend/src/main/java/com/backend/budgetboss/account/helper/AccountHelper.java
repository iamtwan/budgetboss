package com.backend.budgetboss.account.helper;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.account.AccountRepository;
import com.backend.budgetboss.account.exception.AccountNotFoundException;
import com.backend.budgetboss.account.exception.AccountOwnershipException;
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
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
    }

    public Account getAccountByAccountId(String accountId) {
        return accountRepository.findByAccountId(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + accountId));
    }

    public void assertAccountOwnership(User user, Account account) {
        if (!account.getItem().getUser().equals(user)) {
            throw new AccountOwnershipException("Account does not belong to user: " + user.getEmail());
        }
    }
}
