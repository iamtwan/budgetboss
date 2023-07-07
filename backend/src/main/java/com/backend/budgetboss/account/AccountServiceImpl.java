package com.backend.budgetboss.account;

import com.backend.budgetboss.account.dto.AccountResponseDTO;
import com.backend.budgetboss.account.exception.AccountRequestException;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.backend.budgetboss.user.User;
import com.plaid.client.model.AccountBase;
import com.plaid.client.model.AccountType;
import com.plaid.client.model.AccountsGetRequest;
import com.plaid.client.model.AccountsGetResponse;
import com.plaid.client.request.PlaidApi;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

@Service
public class AccountServiceImpl implements AccountService {

  private final AccountRepository accountRepository;
  private final ItemRepository itemRepository;
  private final ItemHelper itemHelper;
  private final PlaidApi plaidApi;
  private final ModelMapper modelMapper;

  public AccountServiceImpl(AccountRepository accountRepository,
      ItemRepository itemRepository,
      ItemHelper itemHelper,
      PlaidApi plaidApi,
      ModelMapper modelMapper) {
    this.accountRepository = accountRepository;
    this.itemRepository = itemRepository;
    this.itemHelper = itemHelper;
    this.plaidApi = plaidApi;
    this.modelMapper = modelMapper;
  }

  @Override
  @Transactional
  public void createAccounts(Item item) throws IOException {
    AccountsGetRequest request = new AccountsGetRequest().accessToken(item.getAccessToken());

    Response<AccountsGetResponse> response = plaidApi.accountsGet(request).execute();

    if (!response.isSuccessful() || response.body() == null) {
      throw new AccountRequestException("Unable to retrieve accounts for item: " + item.getId());
    }

    List<Account> accounts = new ArrayList<>();

    for (AccountBase accountBase : response.body().getAccounts()) {
      Account account = accountRepository.findByAccountId(accountBase.getAccountId())
          .orElse(new Account(item));
      modelMapper.map(accountBase, account);
      accounts.add(account);
    }

    item.getAccounts().clear();
    item.getAccounts().addAll(accounts);
    itemRepository.save(item);
  }

  @Override
  public List<AccountResponseDTO> getAccountsByItemIdAndType(User user, Long id, AccountType type) {
    Item item = itemHelper.getItem(user, id);

    return accountRepository.findByItemAndType(item, type)
        .stream()
        .map(account -> modelMapper.map(account, AccountResponseDTO.class))
        .toList();
  }
}
