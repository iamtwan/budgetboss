package com.backend.budgetboss.user;

import com.backend.budgetboss.security.UserDetailsImpl;
import com.backend.budgetboss.security.exception.UserAlreadyExistsException;
import com.backend.budgetboss.user.dtos.CreateUserDTO;
import com.backend.budgetboss.user.dtos.UserResponseDTO;
import com.backend.budgetboss.user.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserUtil userUtil;
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

    public UserServiceImpl(UserRepository userRepository,
                           ModelMapper modelMapper,
                           BCryptPasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           UserUtil userUtil) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userUtil = userUtil;
    }

    @Override
    public UserResponseDTO getUser() {
        return modelMapper.map(userUtil.getUser(), UserResponseDTO.class);
    }

    @Override
    public UserResponseDTO registerUser(CreateUserDTO createUserDTO,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new UserAlreadyExistsException("User already exists for email: " + createUserDTO.getEmail());
        }

        String temp = createUserDTO.getPassword();
        createUserDTO.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
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
                new UsernamePasswordAuthenticationToken(createUserDTO.getEmail(), createUserDTO.getPassword())
        );
        setAuthenticationContext(authentication, request, response);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return modelMapper.map(userDetails, UserResponseDTO.class);
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
