package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.manualtransaction.dto.CreateManualTransactionDTO;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manual-transactions")
@Tag(name = "Manual Transactions")
public class ManualTransactionController {

  private final Logger logger = LoggerFactory.getLogger(ManualTransactionController.class);
  private final ManualTransactionService manualTransactionService;

  public ManualTransactionController(ManualTransactionService manualTransactionService) {
    this.manualTransactionService = manualTransactionService;
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get manual transactions for the given account", description = "Get all manual transactions for the given account")
  public ResponseEntity<List<ManualTransactionResponseDTO>> getManualTransactions(
      @CurrentUser User user, @PathVariable Long id) {
    logger.info("/api/manual-transactions/{} GET request received", id);
    List<ManualTransactionResponseDTO> manualTransactions = manualTransactionService.getManualTransactions(
        user, id);
    logger.info("/api/manual-transactions/{} retrieved manual transactions: {}",
        manualTransactions.size(), id);
    return ResponseEntity.ok(manualTransactions);
  }

  @PostMapping("/{accountId}")
  @Operation(summary = "Create a manual transaction", description = "Create a manual transaction for the given account")
  public ResponseEntity<ManualTransactionResponseDTO> createManualTransaction(
      @CurrentUser User user,
      @PathVariable Long accountId,
      @Valid @RequestBody CreateManualTransactionDTO manualTransactionDTO) {
    logger.info("/api/manual-transactions/{} POST request received: {}", accountId,
        manualTransactionDTO);
    ManualTransactionResponseDTO manualTransaction = manualTransactionService.createManualTransaction(
        user, accountId, manualTransactionDTO);
    logger.info("/api/manual-transactions/{} created manual transaction: {}", manualTransaction,
        accountId);
    return new ResponseEntity<>(manualTransaction, HttpStatus.CREATED);
  }

  @PutMapping("/{transactionId}")
  @Operation(summary = "Update a manual transaction", description = "Update a manual transaction with the given id")
  public ResponseEntity<ManualTransactionResponseDTO> updateManualTransaction(
      @CurrentUser User user,
      @PathVariable Long transactionId,
      @Valid @RequestBody CreateManualTransactionDTO manualTransactionDTO) {
    logger.info("/api/manual-transactions/{} PUT request received: {}", transactionId,
        manualTransactionDTO);
    ManualTransactionResponseDTO manualTransaction = manualTransactionService.updateManualTransaction(
        user, transactionId, manualTransactionDTO);
    logger.info("/api/manual-transactions/{} updated manual transaction: {}", manualTransaction,
        transactionId);
    return ResponseEntity.ok(manualTransaction);
  }

  @DeleteMapping("/{transactionId}")
  @Operation(summary = "Delete a manual transaction", description = "Delete a manual transaction with the given id")
  public ResponseEntity<Void> deleteManualTransaction(
      @CurrentUser User user,
      @PathVariable Long transactionId) {
    logger.info("/api/manual-transactions/{} DELETE request received", transactionId);
    manualTransactionService.deleteManualTransaction(user, transactionId);
    logger.info("/api/manual-transactions/{} deleted manual transaction", transactionId);
    return ResponseEntity.noContent().build();
  }
}
