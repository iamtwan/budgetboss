package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@Tag(name = "Items")
public class ItemController {
    private final static Logger logger = LoggerFactory.getLogger(ItemController.class);
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    @Operation(summary = "Get all items", description = "Get all items for the current user")
    public ResponseEntity<List<ItemResponseDTO>> getAllItems() throws IOException {
        logger.info("/api/items GET request received");
        List<ItemResponseDTO> items = itemService.getAllItems();
        logger.info("/api/items got all items: {}", items.size());
        return ResponseEntity.ok(items);
    }

    @DeleteMapping({"/{itemId}"})
    @Operation(summary = "Delete an item", description = "Delete an item for the current user with the given id")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) throws IOException {
        logger.info("/api/items/{} DELETE request received", itemId);
        itemService.deleteItem(itemId);
        logger.info("/api/items/{} deleted item", itemId);
        return ResponseEntity.noContent().build();
    }
}
