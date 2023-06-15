package com.backend.budgetboss.item.helper;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.exception.ItemNotFoundException;
import com.backend.budgetboss.user.User;
import org.springframework.stereotype.Component;

@Component
public class ItemHelper {

  private final ItemRepository itemRepository;

  public ItemHelper(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  public Item getItem(User user, Long id) {
    return itemRepository.findByUserAndId(user, id)
        .orElseThrow(() -> new ItemNotFoundException(id));
  }

  public Item getItemByItemId(String itemId) {
    return itemRepository.findByItemId(itemId)
        .orElseThrow(() -> new ItemNotFoundException(itemId));
  }
}
