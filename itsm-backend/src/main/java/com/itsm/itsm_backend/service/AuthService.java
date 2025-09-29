package com.itsm.itsm_backend.service;

import com.itsm.itsm_backend.dto.AuthResponse;
import com.itsm.itsm_backend.dto.LoginRequest;
import com.itsm.itsm_backend.dto.RegisterRequest;
import com.itsm.itsm_backend.entity.User;
import com.itsm.itsm_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already in use");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setAuthProvider("local"); 

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
        } catch (AuthenticationException e) {
            System.err.println("Authentication failed for user " + request.getEmail() + ": " + e.getMessage());
            e.printStackTrace();
            throw e; 
        }

        // If authentication is successful, proceed to generate token
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalStateException("User not found after authentication"));
        
        // The jwtService now creates a token that includes the user's roles
        var jwtToken = jwtService.generateToken(user);

        // --- THE FIX IS HERE ---
        // We now use the new, detailed constructor from AuthResponse to include the roles.
        return new AuthResponse(jwtToken, user.getEmail(), user.getAuthorities());
    }
}

