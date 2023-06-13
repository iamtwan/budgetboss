package com.backend.budgetboss.user;

import com.backend.budgetboss.user.dto.CreateUserDTO;
import com.backend.budgetboss.user.dto.UserResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        logger.info("/api/users GET request received");
        UserResponseDTO userResponse = userService.getUser();
        logger.info("/api/users got current user: {}", userResponse);
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Register a new user with the given email and password")
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody CreateUserDTO user,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) {
        logger.info("/api/users/register POST request received: {}", user);
        UserResponseDTO userResponse = userService.registerUser(user, request, response);
        logger.info("/api/users/register created user: {}", userResponse);
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
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
        throw new IllegalStateException("This method shouldn't be called. It's implemented by Spring Security's filter chain.");
    }
}