package com.backend.budgetboss.item.helper;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.exception.ItemNotFoundException;
import com.backend.budgetboss.item.exception.ItemOwnershipException;
import com.backend.budgetboss.user.User;
import org.springframework.stereotype.Component;

@Component
public class ItemHelper {

  private final ItemRepository itemRepository;

  public ItemHelper(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  public Item getItem(Long id) {
    return itemRepository.findById(id)
        .orElseThrow(() -> new ItemNotFoundException("Item not found with ID: " + id));
  }

  public Item getItemByItemId(String itemId) {
    return itemRepository.findByItemId(itemId)
        .orElseThrow(() -> new ItemNotFoundException("Item not found with ID: " + itemId));
  }

  public void assertItemOwnership(User user, Item item) {
    if (!item.getUser().equals(user)) {
      throw new ItemOwnershipException(
          "Item does not belong to user: " + item.getUser().getEmail());
    }
  }
}
