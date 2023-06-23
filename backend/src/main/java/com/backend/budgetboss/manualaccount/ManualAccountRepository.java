package com.backend.budgetboss.manualaccount;

import com.backend.budgetboss.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManualAccountRepository extends JpaRepository<ManualAccount, Long> {
  Optional<ManualAccount> findByManualInstitution_UserAndId(User user, Long id);
}
