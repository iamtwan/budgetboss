package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.manualtransaction.dto.CreateManualTransactionDTO;
import com.backend.budgetboss.manualtransaction.dto.ManualTransactionResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<ManualTransactionResponseDTO>> getManualTransactions(@PathVariable Long id) {
        logger.info("/api/manual-transactions/{} GET request received", id);
        List<ManualTransactionResponseDTO> manualTransactions = manualTransactionService.getManualTransactions(id);
        logger.info("/api/manual-transactions/{} retrieved manual transactions: {}", manualTransactions.size(), id);
        return ResponseEntity.ok(manualTransactions);
    }

    @PostMapping("/{accountId}")
    @Operation(summary = "Create a manual transaction", description = "Create a manual transaction for the given account")
    public ResponseEntity<ManualTransactionResponseDTO> createManualTransaction(@PathVariable Long accountId, @Valid @RequestBody CreateManualTransactionDTO manualTransactionDTO) {
        logger.info("/api/manual-transactions/{} POST request received: {}", accountId, manualTransactionDTO);
        ManualTransactionResponseDTO manualTransaction = manualTransactionService.createManualTransaction(accountId, manualTransactionDTO);
        logger.info("/api/manual-transactions/{} created manual transaction: {}", manualTransaction, accountId);
        return ResponseEntity.ok(manualTransaction);
    }

    @PutMapping("/{transactionId}")
    @Operation(summary = "Update a manual transaction", description = "Update a manual transaction with the given id")
    public ResponseEntity<ManualTransactionResponseDTO> updateManualTransaction(@PathVariable Long transactionId, @Valid @RequestBody CreateManualTransactionDTO manualTransactionDTO) {
        logger.info("/api/manual-transactions/{} PUT request received: {}", transactionId, manualTransactionDTO);
        ManualTransactionResponseDTO manualTransaction = manualTransactionService.updateManualTransaction(transactionId, manualTransactionDTO);
        logger.info("/api/manual-transactions/{} updated manual transaction: {}", manualTransaction, transactionId);
        return ResponseEntity.ok(manualTransaction);
    }

    @DeleteMapping("/{transactionId}")
    @Operation(summary = "Delete a manual transaction", description = "Delete a manual transaction with the given id")
    public ResponseEntity<Void> deleteManualTransaction(@PathVariable Long transactionId) {
        logger.info("/api/manual-transactions/{} DELETE request received", transactionId);
        manualTransactionService.deleteManualTransaction(transactionId);
        logger.info("/api/manual-transactions/{} deleted manual transaction", transactionId);
        return ResponseEntity.noContent().build();
    }
}
