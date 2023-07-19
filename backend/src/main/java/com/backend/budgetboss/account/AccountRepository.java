package com.backend.budgetboss.account;

import com.backend.budgetboss.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

  Optional<Account> findByAccountId(String accountId);

  Optional<Account> findByItem_UserAndId(User user, Long id);

  Optional<Account> findByItem_UserAndAccountId(User user, String accountId);
}
