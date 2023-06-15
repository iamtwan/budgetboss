package com.backend.budgetboss.token;

import com.backend.budgetboss.security.UserPrincipal;
import com.plaid.client.model.LinkTokenCreateResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tokens")
@Tag(name = "Tokens")
public class TokenController {

  private final Logger logger = LoggerFactory.getLogger(TokenController.class);
  private final TokenService tokenService;

  public TokenController(TokenService tokenService) {
    this.tokenService = tokenService;
  }

  @PostMapping
  @Operation(summary = "Create a link token", description = "Create a link token for the current user")
  public ResponseEntity<LinkTokenCreateResponse> createLinkToken(
      @AuthenticationPrincipal UserPrincipal principal) throws IOException {
    logger.info("/api/tokens POST request received");
    LinkTokenCreateResponse response = tokenService.createLinkToken(principal.getUser());
    logger.info("/api/tokens created link token: {}", response);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/{id}")
  @Operation(summary = "Update the given Item via Link", description = "Enables update mode for Link. https://plaid.com/docs/link/update-mode/")
  public ResponseEntity<LinkTokenCreateResponse> updateMode(
      @AuthenticationPrincipal UserPrincipal principal,
      @PathVariable Long id) throws IOException {
    logger.info("/api/tokens/{} POST request received", id);
    LinkTokenCreateResponse response = tokenService.createLinkToken(principal.getUser(), id);
    logger.info("/api/tokens/{} created link token: {}", id, response);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/exchange")
  @Operation(summary = "Exchange public token", description = "Exchange a public token for an access token")
  public ResponseEntity<Void> exchangePublicToken(
      @AuthenticationPrincipal UserPrincipal principal,
      @Valid @RequestBody Token token)
      throws IOException {
    logger.info("/api/tokens/exchange POST request received");
    tokenService.exchangePublicToken(principal.getUser(), token);
    logger.info("/api/tokens/exchange exchanged public token for access token");
    return ResponseEntity.noContent().build();
  }
}
