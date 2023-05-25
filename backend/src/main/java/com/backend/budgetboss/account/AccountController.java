package com.backend.budgetboss.account;

import com.backend.budgetboss.account.dto.PublicTokenDTO;
import com.plaid.client.model.LinkTokenCreateResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    @Operation(summary = "Get all accounts", description = "Get all accounts for the current user")
    public ResponseEntity<List<Account>> getAllAccounts() {
        logger.info("/api/accounts GET request received");
        List<Account> accounts = accountService.getAllAccounts();
        logger.info("/api/accounts GET got all accounts: {}", accounts.size());
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/token")
    @Operation(summary = "Create a link token", description = "Create a link token for the current user")
    public ResponseEntity<LinkTokenCreateResponse> createLinkToken() throws IOException {
        logger.info("/api/accounts/token GET request received");
        LinkTokenCreateResponse linkTokenCreateResponse = accountService.createLinkToken();
        logger.info("/api/accounts/token GET created link token: {}", linkTokenCreateResponse);
        return ResponseEntity.ok(linkTokenCreateResponse);
    }

    @PostMapping("/token")
    @Operation(summary = "Exchange public token", description = "Exchange a public token for an access token")
    public ResponseEntity<Void> exchangePublicToken(@RequestBody PublicTokenDTO publicToken) throws IOException {
        logger.info("/api/accounts/token POST request received");
        accountService.exchangePublicToken(publicToken);
        logger.info("/api/accounts/token POST exchanged public token for access token");
        return ResponseEntity.noContent().build();
    }
}
