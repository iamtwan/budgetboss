package com.backend.budgetboss.token;

import com.plaid.client.model.LinkTokenCreateResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/tokens")
@Tag(name = "Tokens")
public class TokenController {
    private final Logger logger = LoggerFactory.getLogger(TokenController.class);
    private final TokenService tokenService;

    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @GetMapping
    @Operation(summary = "Create a link token", description = "Create a link token for the current user")
    public ResponseEntity<LinkTokenCreateResponse> createLinkToken() throws IOException {
        logger.info("/api/tokens GET request received");
        LinkTokenCreateResponse linkTokenCreateResponse = tokenService.createLinkToken();
        logger.info("/api/tokens created link token: {}", linkTokenCreateResponse);
        return ResponseEntity.ok(linkTokenCreateResponse);
    }

    @PostMapping
    @Operation(summary = "Exchange public token", description = "Exchange a public token for an access token")
        public ResponseEntity<Void> exchangePublicToken(@Valid @RequestBody Token token) throws IOException {
        logger.info("/api/tokens POST request received");
        tokenService.exchangePublicToken(token);
        logger.info("/api/tokens exchanged public token for access token");
        return ResponseEntity.noContent().build();
    }
}
