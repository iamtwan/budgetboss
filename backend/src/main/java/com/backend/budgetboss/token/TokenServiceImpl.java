package com.backend.budgetboss.token;

import com.backend.budgetboss.account.AccountService;
import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.transaction.TransactionService;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

import java.io.IOException;
import java.util.List;

@Service
public class TokenServiceImpl implements TokenService {
    private final UserUtil userUtil;
    private final ItemRepository itemRepository;
    private final TransactionService transactionService;
    private final AccountService accountService;
    private final PlaidApi plaidApi;

    public TokenServiceImpl(UserUtil userUtil,
                            ItemRepository itemRepository,
                            TransactionService transactionService,
                            AccountService accountService,
                            PlaidApi plaidApi) {
        this.userUtil = userUtil;
        this.itemRepository = itemRepository;
        this.transactionService = transactionService;
        this.accountService = accountService;
        this.plaidApi = plaidApi;
    }

    @Override
    public LinkTokenCreateResponse createLinkToken() throws IOException {
        User user = userUtil.getUser();

        LinkTokenCreateRequestUser requestUser = new LinkTokenCreateRequestUser()
                .clientUserId(String.valueOf(user.getId()));

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(requestUser)
                .clientName("Budget Boss")
                .products(List.of(Products.TRANSACTIONS))
                .countryCodes(List.of(CountryCode.US))
                .language("en")
                .webhook("http://677a-2603-8080-7c00-22fd-4055-e7e9-3057-24f8.ngrok.io/api/webhooks");

        Response<LinkTokenCreateResponse> response = plaidApi
                .linkTokenCreate(request)
                .execute();

        if (!response.isSuccessful()) {
            throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
        }

        return response.body();
    }

    @Override
    @Transactional
    public void exchangePublicToken(Token token) throws IOException {
        User user = userUtil.getUser();

        if (itemRepository.existsByUserAndInstitutionId(user, token.getId())) {
            throw new TokenCreationException("User already has an item for institution: " + token.getId());
        }

        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest()
                .publicToken(token.getPublicToken());

        Response<ItemPublicTokenExchangeResponse> response = plaidApi
                .itemPublicTokenExchange(request)
                .execute();

        if (!response.isSuccessful() || response.body() == null) {
            throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
        }

        Item item = new Item();
        item.setUser(user);
        item.setAccessToken(response.body().getAccessToken());
        item.setItemId(response.body().getItemId());
        item.setInstitutionId(token.getId());
        item.setInstitutionName(token.getName());

        Item newItem = itemRepository.save(item);
        accountService.createAccounts(newItem.getId());
        transactionService.syncTransactions(newItem.getItemId());
    }
}
