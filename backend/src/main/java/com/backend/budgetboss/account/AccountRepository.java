package com.backend.budgetboss.account;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.user.User;
import com.plaid.client.model.AccountType;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

  Optional<Account> findByAccountId(String accountId);

  Optional<Account> findByItem_UserAndId(User user, Long id);

  List<Account> findByItemAndType(Item item, AccountType type);
}
