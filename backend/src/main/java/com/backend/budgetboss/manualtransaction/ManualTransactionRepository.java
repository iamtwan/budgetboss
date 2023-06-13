package com.backend.budgetboss.manualtransaction;

import com.backend.budgetboss.transaction.TransactionEntity;
import com.backend.budgetboss.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ManualTransactionRepository extends JpaRepository<ManualTransaction, Long> {
    List<ManualTransaction> findAllByManualAccountId(Long manualAccountId);

	List<ManualTransaction> findByManualAccount_ManualInstitution_UserAndDateAfter(User user, LocalDate date);

	List<ManualTransaction> findByManualAccount_ManualInstitution_UserAndDateBetween(User user, LocalDate start, LocalDate end);
}
