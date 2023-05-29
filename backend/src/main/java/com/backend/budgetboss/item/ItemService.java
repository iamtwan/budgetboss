package com.backend.budgetboss.item;

import com.backend.budgetboss.item.dto.CreateAccountDTO;
import com.backend.budgetboss.item.dto.ItemResponseDTO;
import com.backend.budgetboss.item.dto.PublicTokenDTO;
import com.plaid.client.model.LinkTokenCreateResponse;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    List<ItemResponseDTO> getAllItems() throws IOException;
    LinkTokenCreateResponse createLinkToken() throws IOException;
    void exchangePublicToken(PublicTokenDTO publicToken) throws IOException;
    void deleteItem(Long itemId) throws IOException;
}
