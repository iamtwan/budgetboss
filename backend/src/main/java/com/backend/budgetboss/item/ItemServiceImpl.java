package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;
import com.backend.budgetboss.item.helper.ItemHelper;
import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.user.User;
import com.plaid.client.model.ItemRemoveRequest;
import com.plaid.client.model.ItemRemoveResponse;
import com.plaid.client.request.PlaidApi;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import retrofit2.Response;

@Service
public class ItemServiceImpl implements ItemService {

  private final ItemRepository itemRepository;
  private final ItemHelper itemHelper;
  private final PlaidApi plaidApi;
  private final ModelMapper modelMapper;

  public ItemServiceImpl(ItemRepository itemRepository,
      ItemHelper itemHelper,
      PlaidApi plaidApi,
      ModelMapper modelMapper) {
    this.itemRepository = itemRepository;
    this.itemHelper = itemHelper;
    this.plaidApi = plaidApi;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<ItemResponseDTO> getAllItems(User user) {
    List<Item> items = itemRepository.findAllByUser(user);
    List<ItemResponseDTO> itemResponseDTOs = new ArrayList<>();

    for (Item item : items) {
      ItemResponseDTO itemResponseDTO = modelMapper.map(item, ItemResponseDTO.class);
      itemResponseDTOs.add(itemResponseDTO);
    }

    return itemResponseDTOs;
  }

  @Override
  public List<ItemResponseDTO> getItemsByCash(User user, int pageNo, int pageSize) {
    return null;
  }

  @Override
  @Transactional
  public void deleteItem(User user, Long itemId) throws IOException {
    Item item = itemHelper.getItem(user, itemId);

    itemRepository.delete(item);
    ItemRemoveRequest request = new ItemRemoveRequest().accessToken(item.getAccessToken());
    Response<ItemRemoveResponse> response = plaidApi.itemRemove(request).execute();

    if (!response.isSuccessful()) {
      throw new TokenCreationException("Unable to remove item: " + itemId);
    }
  }

  @Override
  @Transactional
  public void unlinkUser(User user) {
    List<Item> items = itemRepository.findAllByUser(user);
    itemRepository.deleteAll(items);
  }
}
