package com.backend.budgetboss.account;

import com.backend.budgetboss.account.dto.AccountResponseDTO;
import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import com.plaid.client.model.AccountType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
@Tag(name = "Accounts")
public class AccountController {

  private final static Logger logger = LoggerFactory.getLogger(AccountController.class);
  private final AccountService accountService;

  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  @GetMapping("/{id}/{type}")
  @Operation(summary = "Get accounts by item id and account type", description = "Get accounts by item id and account type")
  public ResponseEntity<List<AccountResponseDTO>> getAccountsByItemIdAndType(@CurrentUser User user,
      @PathVariable Long id,
      @PathVariable AccountType type,
      @RequestParam(defaultValue = "0") int page) {
    logger.info("/api/accounts/{}/{} GET request received", id, type);
    List<AccountResponseDTO> accounts = accountService.getAccountsByItemIdAndType(user, id, type, page);
    logger.info("/api/accounts/{}/{} got accounts: {}", id, type, accounts.size());
    return ResponseEntity.ok(accounts);
  }
}
