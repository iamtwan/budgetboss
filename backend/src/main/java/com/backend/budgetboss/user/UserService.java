package com.backend.budgetboss.user;

import com.backend.budgetboss.user.dtos.CreateUserDTO;
import com.backend.budgetboss.user.dtos.UserResponseDTO;

public interface UserService {
    UserResponseDTO registerUser(CreateUserDTO createUserDTO);
    UserResponseDTO loginUser(CreateUserDTO createUserDTO);
}
