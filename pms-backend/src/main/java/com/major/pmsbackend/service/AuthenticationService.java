package com.major.pmsbackend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.major.pmsbackend.controller.AuthenticationRequest;
import com.major.pmsbackend.controller.AuthenticationResponse;
import com.major.pmsbackend.controller.RegisterRequest;
import com.major.pmsbackend.entity.Role;
import com.major.pmsbackend.entity.Users;
import com.major.pmsbackend.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthenticationResponse register(RegisterRequest request) {
        var user = Users.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .phone(request.getPhone())
            .gender(request.getGender())
            .role(Role.USER)
            .build();
            if(repository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists.");
            }
            if (user != null) {
                repository.save(user);
            } else {
                throw new RuntimeException("Fill all the fields properly.");
            }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).email(user.getEmail()).build();
    }
    
}
