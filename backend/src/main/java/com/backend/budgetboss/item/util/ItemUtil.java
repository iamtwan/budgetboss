package com.backend.budgetboss.item.util;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.item.exception.ItemNotFoundException;
import com.backend.budgetboss.token.exception.TokenCreationException;
import com.backend.budgetboss.user.User;
import org.springframework.stereotype.Component;

@Component
public class ItemUtil {
    private final ItemRepository itemRepository;

    public ItemUtil(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item getItem(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with ID: " + id));
    }

    public void assertItemOwnership(User user, Item item) {
        if (!item.getUser().equals(user)) {
            throw new TokenCreationException("Item does not belong to user: " + item.getUser().getEmail());
        }
    }
}
