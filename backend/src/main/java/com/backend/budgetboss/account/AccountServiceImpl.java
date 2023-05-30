package com.backend.budgetboss.account;

import com.backend.budgetboss.account.exception.AccountRequestException;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.util.ItemUtil;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.AccountBase;
import com.plaid.client.model.AccountsGetRequest;
import com.plaid.client.model.AccountsGetResponse;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

import java.io.IOException;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final BalanceRepository balanceRepository;
    private final UserUtil userUtil;
    private final ItemUtil itemUtil;
    private final PlaidApi plaidApi;

    public AccountServiceImpl(AccountRepository accountRepository,
                              BalanceRepository balanceRepository,
                              UserUtil userUtil,
                              ItemUtil itemUtil,
                              PlaidApi plaidApi) {
        this.accountRepository = accountRepository;
        this.balanceRepository = balanceRepository;
        this.userUtil = userUtil;
        this.itemUtil = itemUtil;
        this.plaidApi = plaidApi;
    }


    @Override
    @Transactional
    public void createAccounts(Long id) throws IOException {
        User user = userUtil.getUser();
        Item item = itemUtil.getItem(id);

        itemUtil.assertItemOwnership(user, item);

        AccountsGetRequest request = new AccountsGetRequest()
                .accessToken(item.getAccessToken());

        Response<AccountsGetResponse> response = plaidApi.accountsGet(request).execute();

        if (!response.isSuccessful() || response.body() == null) {
            throw new AccountRequestException("Unable to retrieve accounts for item: " + item.getId());
        }

        List<Account> accounts = response.body().getAccounts()
                .stream()
                .map(accountBase -> new Account(accountBase, item))
                .toList();

        accountRepository.saveAll(accounts);
    }
}
