package com.backend.budgetboss.account;

import com.backend.budgetboss.user.User;
import com.plaid.client.model.AccountType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

  Optional<Account> findByAccountId(String accountId);

  Optional<Account> findByItem_UserAndId(User user, Long id);

  List<Account> findAllByItem_UserAndType(User user, AccountType type);
}
