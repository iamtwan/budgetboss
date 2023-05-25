package com.backend.budgetboss.user;

import com.backend.budgetboss.user.dtos.CreateUserDTO;
import com.backend.budgetboss.user.dtos.UserResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
