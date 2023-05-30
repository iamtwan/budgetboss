package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;
import com.backend.budgetboss.item.exception.AccountRequestException;
import com.backend.budgetboss.item.exception.ItemDoesNotBelongToUserException;
import com.backend.budgetboss.item.util.ItemUtil;
import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.util.UserUtil;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final UserUtil userUtil;
    private final ItemUtil itemUtil;
    private final PlaidApi plaidApi;

    public ItemServiceImpl(ItemRepository itemRepository, UserUtil userUtil, ItemUtil itemUtil, PlaidApi plaidApi) {
        this.itemRepository = itemRepository;
        this.userUtil = userUtil;
        this.itemUtil = itemUtil;
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

            if (!response.isSuccessful() || response.body() == null) {
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
    @Transactional
    public void deleteItem(Long itemId) throws IOException {
        User user = userUtil.getUser();
        Item item = itemUtil.getItem(itemId);

        if (!item.getUser().equals(user)) {
            throw new ItemDoesNotBelongToUserException("Item does not belong to user: " + user.getEmail());
        }

        itemRepository.delete(item);
        ItemRemoveRequest request = new ItemRemoveRequest().accessToken(item.getAccessToken());
        Response<ItemRemoveResponse> response = plaidApi.itemRemove(request).execute();

        if (!response.isSuccessful()) {
            throw new TokenCreationException("Unable to remove item: " + itemId);
        }
    }
}
