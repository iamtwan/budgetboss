package com.backend.budgetboss.item.util;

import com.backend.budgetboss.item.Item;
import com.backend.budgetboss.item.ItemRepository;
import com.backend.budgetboss.token.exception.TokenCreationException;
import org.springframework.stereotype.Component;

@Component
public class ItemUtil {
    private final ItemRepository itemRepository;

    public ItemUtil(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item getItem(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new TokenCreationException("Item not found with ID: " + id));
    }
}
