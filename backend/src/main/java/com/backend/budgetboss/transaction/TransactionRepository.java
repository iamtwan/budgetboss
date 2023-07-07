package com.backend.budgetboss.transaction;

import com.backend.budgetboss.account.Account;
import com.backend.budgetboss.user.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {

  void deleteAllByTransactionIdIn(List<String> transactionIds);

  List<TransactionEntity> findAllByAccount(Account account);

  Optional<TransactionEntity> findByTransactionId(String transactionId);

  List<TransactionEntity> findByAccount_Item_UserAndDateBetween(User user, LocalDate start,
      LocalDate end);
}
