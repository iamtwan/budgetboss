package com.backend.budgetboss.manualinstitution;

import com.backend.budgetboss.manualinstitution.dto.ManualInstitutionResponseDTO;

import java.util.List;

public interface ManualInstitutionService {
    List<ManualInstitutionResponseDTO> getManualInstitutions();
}
