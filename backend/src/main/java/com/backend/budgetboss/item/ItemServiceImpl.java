package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;
import com.backend.budgetboss.item.exception.ItemDoesNotBelongToUserException;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.helper.UserHelper;
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
    private final UserHelper userHelper;
    private final ItemHelper itemHelper;
    private final PlaidApi plaidApi;

    public ItemServiceImpl(ItemRepository itemRepository, UserHelper userHelper, ItemHelper itemHelper, PlaidApi plaidApi) {
        this.itemRepository = itemRepository;
        this.userHelper = userHelper;
        this.itemHelper = itemHelper;
        this.plaidApi = plaidApi;
    }

    @Override
    public List<ItemResponseDTO> getAllItems() {
        User user = userHelper.getUser();
        List<Item> items = itemRepository.findAllByUser(user);
        List<ItemResponseDTO> itemResponseDTOs = new ArrayList<>();

        for (Item item : items) {
            ItemResponseDTO itemResponseDTO = new ItemResponseDTO();
            itemResponseDTO.setName(item.getInstitutionName());
            itemResponseDTO.setId(item.getId());
            itemResponseDTO.setAccounts(item.getAccounts());
            itemResponseDTOs.add(itemResponseDTO);
        }

        return itemResponseDTOs;
    }

    @Override
    @Transactional
    public void deleteItem(Long itemId) throws IOException {
        User user = userHelper.getUser();
        Item item = itemHelper.getItem(itemId);

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
