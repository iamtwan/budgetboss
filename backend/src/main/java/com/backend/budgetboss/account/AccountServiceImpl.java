package com.backend.budgetboss.account;

import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final UserUtil userUtil;

    public AccountServiceImpl(AccountRepository accountRepository, UserUtil userUtil) {
        this.accountRepository = accountRepository;
        this.userUtil = userUtil;
    }

    @Override
    public List<Account> getAllAccounts() {
        User user = userUtil.getUser();

        List<Account> accounts = accountRepository.findAllByUser(user);
        return accountRepository.findAllByUser(user);
    }
}
