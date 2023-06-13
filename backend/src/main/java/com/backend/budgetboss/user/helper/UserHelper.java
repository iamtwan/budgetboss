package com.backend.budgetboss.user.helper;

import com.backend.budgetboss.user.User;
import com.backend.budgetboss.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserHelper {

  private final UserRepository userRepository;

  public UserHelper(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    return userRepository.findByEmail(authentication.getName())
        .orElseThrow(() -> new UsernameNotFoundException(
            "User not found with email: " + authentication.getName()));
  }
}
