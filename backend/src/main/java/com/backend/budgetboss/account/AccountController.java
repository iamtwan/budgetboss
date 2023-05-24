package com.backend.budgetboss.account;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@Tag(name = "Accounts")
public class AccountController {
    private final static Logger logger = LoggerFactory.getLogger(AccountController.class);
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        logger.info("/api/accounts GET request received");
        List<Account> accounts = accountService.getAllAccounts();
        logger.info("/api/accounts GET got all accounts: {}", accounts.size());
        return ResponseEntity.ok(accounts);
    }
}
