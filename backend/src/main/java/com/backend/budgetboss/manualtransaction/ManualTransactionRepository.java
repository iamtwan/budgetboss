package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.user.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManualTransactionRepository extends JpaRepository<ManualTransaction, Long> {

  List<ManualTransaction> findAllByManualAccountId(Long manualAccountId);

  List<ManualTransaction> findByManualAccount_ManualInstitution_UserAndDateBetween(User user,
      LocalDate start, LocalDate end);

  Optional<ManualTransaction> findByManualAccount_ManualInstitution_UserAndId(User user, Long id);
}
