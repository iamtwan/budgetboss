package com.backend.budgetboss.manualinstitution.helper;

import com.backend.budgetboss.manualinstitution.ManualInstitution;
import com.backend.budgetboss.manualinstitution.ManualInstitutionRepository;
import com.backend.budgetboss.manualinstitution.exception.ManualInstitutionNotFoundException;
import com.backend.budgetboss.user.User;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class ManualInstitutionHelper {

  private final ManualInstitutionRepository manualInstitutionRepository;

  public ManualInstitutionHelper(ManualInstitutionRepository manualInstitutionRepository) {
    this.manualInstitutionRepository = manualInstitutionRepository;
  }

  public ManualInstitution getByUserAndId(User user, Long id) {
    return manualInstitutionRepository.findById(id)
        .orElseThrow(() -> new ManualInstitutionNotFoundException(id));
  }

  public Optional<ManualInstitution> getByUserAndName(User user, String name) {
    return manualInstitutionRepository.findByUserAndName(user, name);
  }
}
