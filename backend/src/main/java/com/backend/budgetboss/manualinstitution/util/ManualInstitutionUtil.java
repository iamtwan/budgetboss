package com.backend.budgetboss.manualinstitution.util;

import com.backend.budgetboss.manualinstitution.ManualInstitution;
import com.backend.budgetboss.manualinstitution.ManualInstitutionRepository;
import com.backend.budgetboss.user.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ManualInstitutionUtil {
    private final ManualInstitutionRepository manualInstitutionRepository;

    public ManualInstitutionUtil(ManualInstitutionRepository manualInstitutionRepository) {
        this.manualInstitutionRepository = manualInstitutionRepository;
    }

    public Optional<ManualInstitution> getManualInstitutionByUserAndName(User user, String name) {
        return manualInstitutionRepository.findByUserAndName(user, name);
    }
}
