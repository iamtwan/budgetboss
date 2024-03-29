package com.backend.budgetboss.user;

import com.backend.budgetboss.user.dto.ChangePasswordDTO;
import com.backend.budgetboss.user.dto.CreateUserDTO;
import com.backend.budgetboss.user.dto.UserResponseDTO;
import com.backend.budgetboss.user.verification.dto.RecoverPasswordDTO;
import com.backend.budgetboss.user.verification.dto.RequestCodeDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users")
public class UserController {

  private final Logger logger = LoggerFactory.getLogger(UserController.class);
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  @Operation(summary = "Get current user", description = "Get the current user")
  public ResponseEntity<UserResponseDTO> getCurrentUser(@CurrentUser User user) {
    logger.info("/api/users GET request received");
    UserResponseDTO userResponse = userService.getUser(user);
    logger.info("/api/users got current user: {}", userResponse);
    return ResponseEntity.ok(userResponse);
  }

  @PostMapping("/register")
  @Operation(summary = "Register new user", description = "Register a new user with the given email, password, and verification code")
  public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody CreateUserDTO user,
      HttpServletRequest request,
      HttpServletResponse response) {
    logger.info("/api/users/register POST request received: {}", user);
    UserResponseDTO userResponse = userService.registerUser(user, request, response);
    logger.info("/api/users/register created user: {}", userResponse);
    return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
  }

  @PostMapping("/register/send-code")
  @Operation(summary = "Send a verification code to the provided email", description = "Send a verification code to the provided email")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void sendCode(@RequestBody RequestCodeDTO requestCodeDTO) {
    logger.info("/api/users/register/send-code POST request received");
    userService.sendCode(requestCodeDTO);
    logger.info("/api/users/register/send-code sent code to {}", requestCodeDTO.getEmail());
  }

  @PostMapping("/login")
  @Operation(summary = "Login user", description = "Login a user with the given email and password")
  public ResponseEntity<UserResponseDTO> login(@RequestBody CreateUserDTO user,
      HttpServletRequest request,
      HttpServletResponse response) {
    logger.info("/api/users/login POST request received: {}", user);
    UserResponseDTO userResponse = userService.loginUser(user, request, response);
    logger.info("/api/users/login logged in user: {}", userResponse);
    return ResponseEntity.ok(userResponse);
  }

  @PostMapping("/logout")
  @Operation(summary = "Logout user", description = "Logs out the current user")
  public void logout() {
    logger.info("/api/users/logout POST request received");
    throw new IllegalStateException(
        "This method shouldn't be called. It's implemented by Spring Security's filter chain.");
  }

  @DeleteMapping
  @Operation(summary = "Delete a user's account", description = "Delete a user's account permanently")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(Authentication authentication,
      HttpServletRequest request,
      HttpServletResponse response,
      @CurrentUser User user) {
    logger.info("/api/users DELETE request received");
    userService.deleteUser(authentication, request, response, user);
    logger.info("/api/users deleted user: {}", user.getEmail());
  }

  @PutMapping("/change-password")
  @Operation(summary = "Change the current user's password", description = "Change the current user's password")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void changePassword(Authentication authentication,
      HttpServletRequest request,
      HttpServletResponse response,
      @CurrentUser User user,
      @RequestBody ChangePasswordDTO changePasswordDTO) {
    logger.info("/api/users/change-password PUT request received");
    userService.changePassword(authentication, request, response, user, changePasswordDTO);
    logger.info("/api/users/change-password changed password for user: {}", user.getEmail());
  }

  @PostMapping("/recover-password")
  @Operation(summary = "Change the user's password with the provided password and verification token", description = "Change the user's password with the provided password and verification token")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void recoverPassword(@RequestBody RecoverPasswordDTO recoverPasswordDTO) {
    logger.info("/api/users/recover-password POST request received");
    userService.recoverPassword(recoverPasswordDTO);
    logger.info("/api/users/recover-password updated user password");
  }

  @PostMapping("recover-password/send-link")
  @Operation(summary = "Send a forgotten password link to the provided email", description = "Send a forgotten password link to the provided email")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void sendLink(@RequestBody RequestCodeDTO requestCodeDTO) {
    logger.info("/api/users/recover-password/send-link POST request received");
    userService.sendLink(requestCodeDTO);
    logger.info("/api/users/recover-password/send-link sent link to {}", requestCodeDTO.getEmail());
  }
}