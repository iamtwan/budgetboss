package com.backend.budgetboss.user;

import com.backend.budgetboss.security.UserPrincipal;
import com.backend.budgetboss.security.exception.UserAlreadyExistsException;
import com.backend.budgetboss.user.dto.ChangePasswordDTO;
import com.backend.budgetboss.user.dto.CreateUserDTO;
import com.backend.budgetboss.user.dto.UserResponseDTO;
import com.backend.budgetboss.user.verification.VerificationCode;
import com.backend.budgetboss.user.verification.VerificationRepository;
import com.backend.budgetboss.user.verification.dto.RequestCodeDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final ModelMapper modelMapper;
  private final BCryptPasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
  private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
  private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
  private final JavaMailSender emailSender;
  private final VerificationRepository verificationRepository;

  public UserServiceImpl(UserRepository userRepository,
      ModelMapper modelMapper,
      BCryptPasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager,
      JavaMailSender emailSender,
      VerificationRepository verificationRepository) {
    this.userRepository = userRepository;
    this.modelMapper = modelMapper;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.emailSender = emailSender;
    this.verificationRepository = verificationRepository;
  }

  @Override
  public UserResponseDTO getUser(User user) {
    return modelMapper.map(user, UserResponseDTO.class);
  }

  @Override
  public UserResponseDTO registerUser(CreateUserDTO createUserDTO,
      HttpServletRequest request,
      HttpServletResponse response) {
    if (userRepository.existsByEmail(createUserDTO.getEmail())) {
      throw new UserAlreadyExistsException(
          "User already exists for email: " + createUserDTO.getEmail());
    }

    String temp = createUserDTO.getPassword();
    createUserDTO.setPassword(passwordEncoder.encode(temp));

    User user = userRepository.save(modelMapper.map(createUserDTO, User.class));
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(createUserDTO.getEmail(), temp)
    );
    setAuthenticationContext(authentication, request, response);

    return modelMapper.map(user, UserResponseDTO.class);
  }

  @Override
  public UserResponseDTO loginUser(CreateUserDTO createUserDTO,
      HttpServletRequest request,
      HttpServletResponse response) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(createUserDTO.getEmail(),
            createUserDTO.getPassword())
    );
    setAuthenticationContext(authentication, request, response);
    UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
    return modelMapper.map(userDetails, UserResponseDTO.class);
  }

  @Override
  public void deleteUser(Authentication authentication,
      HttpServletRequest request,
      HttpServletResponse response,
      User user) {
    userRepository.deleteById(user.getId());
    logoutHandler.logout(request, response, authentication);
  }

  @Override
  public void changePassword(Authentication authentication,
      HttpServletRequest request,
      HttpServletResponse response,
      User user,
      ChangePasswordDTO changePasswordDTO) {
    User realUser = userRepository.findByEmail(user.getEmail())
        .orElseThrow(() -> new UsernameNotFoundException(user.getEmail()));
    realUser.setPassword(passwordEncoder.encode(changePasswordDTO.getPassword()));
    userRepository.save(realUser);
    logoutHandler.logout(request, response, authentication);
  }

  @Override
  public void sendCode(RequestCodeDTO requestCodeDTO) {
    String code = RandomStringUtils.randomNumeric(6);

    VerificationCode verificationCode = new VerificationCode(requestCodeDTO.getEmail(), code);
    verificationRepository.save(verificationCode);

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(requestCodeDTO.getEmail());
    message.setSubject("Account verification");
    message.setText("Your verification code is: " + code);

    emailSender.send(message);
  }

  private void setAuthenticationContext(Authentication authentication,
      HttpServletRequest request,
      HttpServletResponse response) {
    SecurityContext context = securityContextHolderStrategy.createEmptyContext();
    context.setAuthentication(authentication);
    securityContextHolderStrategy.setContext(context);
    securityContextRepository.saveContext(context, request, response);
  }
}
