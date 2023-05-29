package com.backend.budgetboss.token;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import retrofit2.Response;

import java.io.IOException;
import java.util.List;

public class TokenServiceImpl implements TokenService {
    private final UserUtil userUtil;
    private final ItemRepository itemRepository;
    private final PlaidApi plaidApi;

    public TokenServiceImpl(UserUtil userUtil, ItemRepository itemRepository, PlaidApi plaidApi) {
        this.userUtil = userUtil;
        this.itemRepository = itemRepository;
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
                .language("en");

        Response<LinkTokenCreateResponse> response = plaidApi
                .linkTokenCreate(request)
                .execute();

        if (!response.isSuccessful()) {
            throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
        }

        return response.body();
    }

    @Override
    public void exchangePublicToken(Token token) throws IOException {
        User user = userUtil.getUser();

        if (itemRepository.existsByUserAndInstitutionId(user, token.getInstitutionId())) {
            throw new TokenCreationException("User already has an item for institution: " + token.getInstitutionId());
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
        item.setInstitutionId(token.getInstitutionId());
        item.setInstitutionName(token.getInstitutionName());

        itemRepository.save(item);
    }
}
