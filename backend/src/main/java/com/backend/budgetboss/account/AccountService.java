package com.backend.budgetboss.account;

import com.backend.budgetboss.item.Item;
import java.io.IOException;

public interface AccountService {

  void createAccounts(Item item) throws IOException;
}
