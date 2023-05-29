package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;
import com.backend.budgetboss.item.dto.PublicTokenDTO;
import com.backend.budgetboss.item.exception.AccountRequestException;
import com.backend.budgetboss.item.exception.TokenCreationException;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final UserUtil userUtil;
    private final PlaidApi plaidApi;

    public ItemServiceImpl(ItemRepository itemRepository, UserUtil userUtil, PlaidApi plaidApi) {
        this.itemRepository = itemRepository;
        this.userUtil = userUtil;
        this.plaidApi = plaidApi;
    }

    @Override
    public List<ItemResponseDTO> getAllItems() throws IOException {
        User user = userUtil.getUser();
        List<Item> items = itemRepository.findAllByUser(user);
        List<ItemResponseDTO> itemResponseDTOs = new ArrayList<>();

        for (Item item : items) {
            AccountsGetRequest request = new AccountsGetRequest()
                    .accessToken(item.getAccessToken());

            Response<AccountsGetResponse> response = plaidApi
                    .accountsGet(request)
                    .execute();

            if (!response.isSuccessful()) {
                throw new AccountRequestException("Unable to retrieve accounts for item: " + item.getId(), response.code());
            }

            ItemResponseDTO itemResponseDTO = new ItemResponseDTO();
            itemResponseDTO.setName(item.getInstitutionName());
            itemResponseDTO.setId(item.getId());
            itemResponseDTO.setAccounts(response.body().getAccounts());
            itemResponseDTOs.add(itemResponseDTO);
        }

        return itemResponseDTOs;
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
    public void exchangePublicToken(PublicTokenDTO publicToken) throws IOException {
        User user = userUtil.getUser();

        if (itemRepository.existsByUserAndInstitutionId(user, publicToken.getInstitutionId())) {
            throw new TokenCreationException("User already has an item for institution: " + publicToken.getInstitutionId());
        }

        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest()
                .publicToken(publicToken.getPublicToken());

        Response<ItemPublicTokenExchangeResponse> response = plaidApi
                .itemPublicTokenExchange(request)
                .execute();

        if (!response.isSuccessful()) {
            throw new TokenCreationException("Unable to create link token for user: " + user.getEmail());
        }

        Item item = new Item();
        item.setUser(user);
        item.setAccessToken(response.body().getAccessToken());
        item.setItemId(response.body().getItemId());
        item.setInstitutionId(publicToken.getInstitutionId());
        item.setInstitutionName(publicToken.getInstitutionName());

        itemRepository.save(item);
    }

    @Override
    public void deleteItem(Long itemId) throws IOException {
        User user = userUtil.getUser();

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new TokenCreationException("Item not found with ID: " + itemId));

        if (!item.getUser().equals(user)) {
            throw new TokenCreationException("Item does not belong to user: " + user.getEmail());
        }

        ItemRemoveRequest request = new ItemRemoveRequest().accessToken(item.getAccessToken());
        Response<ItemRemoveResponse> response = plaidApi.itemRemove(request).execute();

        if (!response.isSuccessful()) {
            throw new TokenCreationException("Unable to remove item: " + itemId);
        }

        itemRepository.delete(item);
    }
}
