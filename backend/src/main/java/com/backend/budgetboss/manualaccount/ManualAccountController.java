package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualaccount.dto.CreateManualAccountDTO;
import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;
import com.backend.budgetboss.manualaccount.dto.UpdateManualAccountDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manual-accounts")
@Tag(name = "Manual Accounts")
public class ManualAccountController {
    private final Logger logger = LoggerFactory.getLogger(ManualAccountController.class);
    private final ManualAccountService manualAccountService;

    public ManualAccountController(ManualAccountService manualAccountService) {
        this.manualAccountService = manualAccountService;
    }

    @PostMapping
    @Operation(summary = "Create manual account", description = "Create a manual account with the given name, institution name, type, and balance")
    public ResponseEntity<ManualAccountResponseDTO> createManualAccount(@Valid @RequestBody CreateManualAccountDTO manualAccountDTO) {
        logger.info("/api/manual-accounts POST request received");
        ManualAccountResponseDTO manualAccount = manualAccountService.createManualAccount(manualAccountDTO);
        logger.info("/api/manual-accounts created manual account: {}", manualAccount);
        return ResponseEntity.ok(manualAccount);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update manual account", description = "Update a manual account with the given name, type, and balance")
    public ResponseEntity<ManualAccountResponseDTO> updateManualAccount(@PathVariable Long id, @Valid @RequestBody UpdateManualAccountDTO manualAccountDTO) {
        logger.info("/api/manual-accounts/{} PUT request received", id);
        ManualAccountResponseDTO manualAccount = manualAccountService.updateManualAccount(id, manualAccountDTO);
        logger.info("/api/manual-accounts/{} updated manual account: {}", id, manualAccount);
        return ResponseEntity.ok(manualAccount);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete manual account", description = "Delete a manual account with the given id")
    public ResponseEntity<Void> deleteManualAccount(@PathVariable Long id) {
        logger.info("/api/manual-accounts/{} DELETE request received", id);
        manualAccountService.deleteManualAccount(id);
        logger.info("/api/manual-accounts/{} deleted manual account", id);
        return ResponseEntity.noContent().build();
    }
}
