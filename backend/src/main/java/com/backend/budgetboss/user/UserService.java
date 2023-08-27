package com.backend.budgetboss.user;

import com.backend.budgetboss.user.dto.ChangePasswordDTO;
import com.backend.budgetboss.user.dto.CreateUserDTO;
import com.backend.budgetboss.user.dto.UserResponseDTO;
import com.backend.budgetboss.user.verification.dto.RecoverPasswordDTO;
import com.backend.budgetboss.user.verification.dto.RequestCodeDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;

public interface UserService {

  UserResponseDTO getUser(User user);

  UserResponseDTO registerUser(CreateUserDTO createUserDTO, HttpServletRequest request,
      HttpServletResponse response);

  UserResponseDTO loginUser(CreateUserDTO createUserDTO, HttpServletRequest request,
      HttpServletResponse response);

  void deleteUser(Authentication authentication,
      HttpServletRequest request,
      HttpServletResponse response,
      User user);

  void changePassword(Authentication authentication,
      HttpServletRequest request,
      HttpServletResponse response,
      User user,
      ChangePasswordDTO changePasswordDTO);

  void recoverPassword(RecoverPasswordDTO recoverPasswordDTO);

  void sendCode(RequestCodeDTO requestCodeDTO);

  void sendLink(RequestCodeDTO requestCodeDTO);
}
