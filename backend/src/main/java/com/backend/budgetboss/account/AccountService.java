package com.backend.budgetboss.account;

import com.backend.budgetboss.account.dto.AccountResponseDTO;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.manualaccount.ManualAccountType;
import com.backend.budgetboss.user.User;
import java.io.IOException;
import java.util.List;

public interface AccountService {

  void createAccounts(Item item) throws IOException;

  List<AccountResponseDTO> getAccountsByType(User user, ManualAccountType type);
}
