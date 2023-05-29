package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.ItemResponseDTO;
import com.backend.budgetboss.item.dto.PublicTokenDTO;
import com.plaid.client.model.LinkTokenCreateResponse;
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

    @GetMapping("/token")
    @Operation(summary = "Create a link token", description = "Create a link token for the current user")
    public ResponseEntity<LinkTokenCreateResponse> createLinkToken() throws IOException {
        logger.info("/api/items/token GET request received");
        LinkTokenCreateResponse linkTokenCreateResponse = itemService.createLinkToken();
        logger.info("/api/items/token created link token: {}", linkTokenCreateResponse);
        return ResponseEntity.ok(linkTokenCreateResponse);
    }

    @PostMapping("/token")
    @Operation(summary = "Exchange public token", description = "Exchange a public token for an access token")
    public ResponseEntity<Void> exchangePublicToken(@RequestBody PublicTokenDTO publicToken) throws IOException {
        logger.info("/api/items/token POST request received");
        itemService.exchangePublicToken(publicToken);
        logger.info("/api/items/token exchanged public token for access token");
        return ResponseEntity.noContent().build();
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
