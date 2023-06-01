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

    @PostMapping("/{id}")
    @Operation(summary = "Create a manual transaction for the given account", description = "Create a manual transaction for the given account")
    public ResponseEntity<ManualTransactionResponseDTO> createManualTransaction(@PathVariable Long id, @Valid @RequestBody CreateManualTransactionDTO manualTransactionDTO) {
        logger.info("/api/manual-transactions/{} POST request received: {}", id, manualTransactionDTO);
        ManualTransactionResponseDTO manualTransaction = manualTransactionService.createManualTransaction(id, manualTransactionDTO);
        logger.info("/api/manual-transactions/{} created manual transaction: {}", manualTransaction, id);
        return ResponseEntity.ok(manualTransaction);
    }
}
