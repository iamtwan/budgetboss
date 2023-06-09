package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.manualaccount.dto.CreateManualAccountDTO;
import com.backend.budgetboss.manualaccount.dto.ManualAccountResponseDTO;
import com.backend.budgetboss.manualaccount.dto.UpdateManualAccountDTO;
import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<ManualAccountResponseDTO> createManualAccount(
      @CurrentUser User user,
      @Valid @RequestBody CreateManualAccountDTO manualAccountDTO) {
    logger.info("/api/manual-accounts POST request received");
    ManualAccountResponseDTO manualAccount = manualAccountService.createManualAccount(user,
        manualAccountDTO);
    logger.info("/api/manual-accounts created manual account: {}", manualAccount);
    return ResponseEntity.ok(manualAccount);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update manual account", description = "Update a manual account with the given name, type, and balance")
  public ResponseEntity<ManualAccountResponseDTO> updateManualAccount(
      @CurrentUser User user,
      @PathVariable Long id,
      @Valid @RequestBody UpdateManualAccountDTO manualAccountDTO) {
    logger.info("/api/manual-accounts/{} PUT request received", id);
    ManualAccountResponseDTO manualAccount = manualAccountService.updateManualAccount(user, id,
        manualAccountDTO);
    logger.info("/api/manual-accounts/{} updated manual account: {}", id, manualAccount);
    return ResponseEntity.ok(manualAccount);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete manual account", description = "Delete a manual account with the given id. This will delete its associated institution if it is the only account associated with it")
  public ResponseEntity<Void> deleteManualAccount(@CurrentUser User user, @PathVariable Long id) {
    logger.info("/api/manual-accounts/{} DELETE request received", id);
    manualAccountService.deleteManualAccount(user, id);
    logger.info("/api/manual-accounts/{} deleted manual account", id);
    return ResponseEntity.noContent().build();
  }
}
