package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import com.backend.budgetboss.manualinstitution.dto.UpdateManualInstitutionDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<ManualInstitutionResponseDTO>> getManualInstitutions() {
        logger.info("/api/manual-institutions GET request received");
        List<ManualInstitutionResponseDTO> manualInstitutions = manualInstitutionService.getManualInstitutions();
        logger.info("/api/manual-institutions returning manual institutions: {}", manualInstitutions.size());
        return ResponseEntity.ok(manualInstitutions);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update manual institution", description = "Update a manual institution with the given name")
    public ResponseEntity<ManualInstitutionResponseDTO> updateManualInstitution(@PathVariable Long id, @Valid @RequestBody UpdateManualInstitutionDTO updateManualInstitutionDTO) {
        logger.info("/api/manual-institutions/{} PUT request received", id);
        ManualInstitutionResponseDTO manualInstitution = manualInstitutionService.updateManualInstitution(id, updateManualInstitutionDTO);
        logger.info("/api/manual-institutions/{} updated manual institution: {}", id, manualInstitution);
        return ResponseEntity.ok(manualInstitution);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete manual institution", description = "Delete a manual institution with the given id")
    public ResponseEntity<Void> deleteManualInstitution(@PathVariable Long id) {
        logger.info("/api/manual-institutions/{} DELETE request received", id);
        manualInstitutionService.deleteManualInstitution(id);
        logger.info("/api/manual-institutions/{} deleted manual institution", id);
        return ResponseEntity.noContent().build();
    }
}

