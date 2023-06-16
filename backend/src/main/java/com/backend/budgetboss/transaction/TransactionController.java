package com.backend.budgetboss.transaction;

import com.backend.budgetboss.transaction.dto.TransactionResponseDTO;
import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transactions")
@Tag(name = "Transactions")
public class TransactionController {

  private final Logger logger = LoggerFactory.getLogger(TransactionController.class);
  private final TransactionService transactionService;

  public TransactionController(TransactionService transactionService) {
    this.transactionService = transactionService;
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get transactions by account id", description = "Get transactions for the given account id")
  public ResponseEntity<List<TransactionResponseDTO>> getTransactionsById(@CurrentUser User user,
      @PathVariable Long id) {
    logger.info("/api/transactions/{} GET request received", id);
    List<TransactionResponseDTO> response = transactionService.getTransactionsByAccountId(user, id);
    logger.info("/api/transactions/{} retrieved transactions: {}", id, response.size());
    return ResponseEntity.ok(response);
  }
}
