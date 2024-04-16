package com.major.pmsbackend.service;

import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.major.pmsbackend.controller.AuthenticationRequest;
import com.major.pmsbackend.controller.AuthenticationResponse;
import com.major.pmsbackend.controller.RegisterRequest;
import com.major.pmsbackend.entity.Role;
import com.major.pmsbackend.entity.Users;
import com.major.pmsbackend.entity.VerificationToken;
import com.major.pmsbackend.repository.UserRepo;
import com.major.pmsbackend.repository.VerificationTokenRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final VerificationTokenRepo verificationTokenRepo;
    private final EmailService emailService;

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
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists.");
        }
        if (user != null) {
            repository.save(user);
            String token = UUID.randomUUID().toString();
            VerificationToken verificationToken = new VerificationToken(token, user);
            verificationTokenRepo.save(verificationToken);
            emailService.sendVerificationEmail(user.getEmail(), token);
        } else {
            throw new RuntimeException("Fill all the fields properly.");
        }
        return AuthenticationResponse.builder().message("Please verify your email").build();
    }

    public AuthenticationResponse verifyEmail(String token) {
        VerificationToken verificationToken = verificationTokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));
        Users user = verificationToken.getUser();
        user.setVerified(true);
        repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).email(user.getEmail()).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).email(user.getEmail()).build();
    }

}
