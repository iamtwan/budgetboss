package com.backend.budgetboss.user;

import com.backend.budgetboss.user.dto.CreateUserDTO;
import com.backend.budgetboss.user.dto.UserResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
    UserResponseDTO getUser();
    UserResponseDTO registerUser(CreateUserDTO createUserDTO, HttpServletRequest request,
                                 HttpServletResponse response);
    UserResponseDTO loginUser(CreateUserDTO createUserDTO, HttpServletRequest request,
                              HttpServletResponse response);
}
