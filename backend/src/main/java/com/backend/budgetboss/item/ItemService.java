package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    List<ItemResponseDTO> getAllItems() throws IOException;
    void deleteItem(Long itemId) throws IOException;
}
