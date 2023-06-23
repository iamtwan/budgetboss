package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import com.backend.budgetboss.manualinstitution.dto.UpdateManualInstitutionDTO;
import com.backend.budgetboss.security.UserPrincipal;
import com.backend.budgetboss.user.CurrentUser;
import com.backend.budgetboss.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manual-institutions")
@Tag(name = "Manual Institutions")
public class ManualInstitutionController {

  private final Logger logger = LoggerFactory.getLogger(ManualInstitutionController.class);
  private final ManualInstitutionService manualInstitutionService;

  public ManualInstitutionController(ManualInstitutionService manualInstitutionService) {
    this.manualInstitutionService = manualInstitutionService;
  }

  @GetMapping
  @Operation(summary = "Get manual institutions", description = "Get all manual institutions")
  public ResponseEntity<List<ManualInstitutionResponseDTO>> getManualInstitutions(
      @CurrentUser User user) {
    logger.info("/api/manual-institutions GET request received");
    List<ManualInstitutionResponseDTO> manualInstitutions = manualInstitutionService.getManualInstitutions(
        user);
    logger.info("/api/manual-institutions returning manual institutions: {}",
        manualInstitutions.size());
    return ResponseEntity.ok(manualInstitutions);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update manual institution", description = "Update a manual institution with the given name")
  public ResponseEntity<ManualInstitutionResponseDTO> updateManualInstitution(
      @CurrentUser User user,
      @PathVariable Long id,
      @Valid @RequestBody UpdateManualInstitutionDTO updateManualInstitutionDTO) {
    logger.info("/api/manual-institutions/{} PUT request received", id);
    ManualInstitutionResponseDTO manualInstitution = manualInstitutionService.updateManualInstitution(
        user, id, updateManualInstitutionDTO);
    logger.info("/api/manual-institutions/{} updated manual institution: {}", id,
        manualInstitution);
    return ResponseEntity.ok(manualInstitution);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete manual institution", description = "Delete a manual institution with the given id")
  public ResponseEntity<Void> deleteManualInstitution(
      @CurrentUser User user,
      @PathVariable Long id) {
    logger.info("/api/manual-institutions/{} DELETE request received", id);
    manualInstitutionService.deleteManualInstitution(user, id);
    logger.info("/api/manual-institutions/{} deleted manual institution", id);
    return ResponseEntity.noContent().build();
  }
}

