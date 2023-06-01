package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<ManualInstitutionResponseDTO>> getManualInstitutions() {
        logger.info("/api/manual-institutions GET request received");
        List<ManualInstitutionResponseDTO> manualInstitutions = manualInstitutionService.getManualInstitutions();
        logger.info("/api/manual-institutions returning manual institutions: {}", manualInstitutions.size());
        return ResponseEntity.ok(manualInstitutions);
    }
}

