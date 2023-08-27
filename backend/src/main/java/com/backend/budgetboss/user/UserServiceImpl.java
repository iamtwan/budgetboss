package com.backend.budgetboss.user;

import com.backend.budgetboss.security.UserPrincipal;
import com.backend.budgetboss.security.exception.UserAlreadyExistsException;
import com.backend.budgetboss.user.dto.ChangePasswordDTO;
import com.backend.budgetboss.user.dto.CreateUserDTO;
import com.backend.budgetboss.user.dto.UserResponseDTO;
import com.backend.budgetboss.user.verification.VerificationCode;
import com.backend.budgetboss.user.verification.VerificationCodeRepository;
import com.backend.budgetboss.user.verification.VerificationToken;
import com.backend.budgetboss.user.verification.VerificationTokenRepository;
import com.backend.budgetboss.user.verification.dto.RecoverPasswordDTO;
import com.backend.budgetboss.user.verification.dto.RequestCodeDTO;
import com.backend.budgetboss.user.verification.exception.VerificationCodeException;
import com.backend.budgetboss.user.verification.exception.VerificationTokenException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.UUID;
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
  private final VerificationCodeRepository verificationCodeRepository;
  private final VerificationTokenRepository verificationTokenRepository;

  public UserServiceImpl(UserRepository userRepository,
      ModelMapper modelMapper,
      BCryptPasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager,
      JavaMailSender emailSender,
      VerificationCodeRepository verificationCodeRepository,
      VerificationTokenRepository verificationTokenRepository) {
    this.userRepository = userRepository;
    this.modelMapper = modelMapper;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.emailSender = emailSender;
    this.verificationCodeRepository = verificationCodeRepository;
    this.verificationTokenRepository = verificationTokenRepository;
  }

  @Override
  public UserResponseDTO getUser(User user) {
    return modelMapper.map(user, UserResponseDTO.class);
  }

  @Override
  public UserResponseDTO registerUser(CreateUserDTO createUserDTO,
      HttpServletRequest request,
      HttpServletResponse response) {
    String email = createUserDTO.getEmail();
    String password = createUserDTO.getPassword();

    if (userRepository.existsByEmail(createUserDTO.getEmail())) {
      throw new UserAlreadyExistsException("User already exists for email: " + email);
    }

    VerificationCode code = verificationCodeRepository
        .findByEmailAndExpirationDateAfter(email, LocalDateTime.now())
        .orElseThrow(VerificationCodeException::new);

    if (!code.getCode().equals(createUserDTO.getVerificationCode())) {
      throw new VerificationCodeException();
    }

    createUserDTO.setPassword(passwordEncoder.encode(password));

    User user = userRepository.save(modelMapper.map(createUserDTO, User.class));
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(createUserDTO.getEmail(), password)
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
  public void recoverPassword(RecoverPasswordDTO recoverPasswordDTO) {
    String token = recoverPasswordDTO.getVerificationToken();

    VerificationToken verificationToken = verificationTokenRepository
        .findByTokenAndExpirationDateAfter(token, LocalDateTime.now())
        .orElseThrow(VerificationTokenException::new);

    String email = verificationToken.getEmail();

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException(email));
    user.setPassword(passwordEncoder.encode(recoverPasswordDTO.getPassword()));
    userRepository.save(user);
  }

  @Override
  public void sendCode(RequestCodeDTO requestCodeDTO) {
    String email = requestCodeDTO.getEmail();
    String code = RandomStringUtils.randomNumeric(6);

    if (userRepository.existsByEmail(email)) {
      throw new UserAlreadyExistsException("User already exists for email: " + email);
    }

    VerificationCode verificationCode = verificationCodeRepository.findByEmail(email)
        .orElse(new VerificationCode(requestCodeDTO.getEmail()));
    verificationCode.setCode(code);

    verificationCodeRepository.save(verificationCode);

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject("Account verification");
    message.setText("Your verification code is: " + code);

    emailSender.send(message);
  }

  @Override
  public void sendLink(RequestCodeDTO requestCodeDTO) {
    String email = requestCodeDTO.getEmail();
    String token = UUID.randomUUID().toString();
    String link = "http://localhost:3000/reset?token=" + token;

    if (!userRepository.existsByEmail(email)) {
      return;
    }

    VerificationToken verificationToken = verificationTokenRepository.findByEmail(email)
        .orElse(new VerificationToken(requestCodeDTO.getEmail()));
    verificationToken.setToken(token);

    verificationTokenRepository.save(verificationToken);

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject("Account Recovery");
    message.setText("Click the following link to recover your account: " + link);

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
