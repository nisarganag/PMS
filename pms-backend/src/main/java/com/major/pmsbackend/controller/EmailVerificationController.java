package com.major.pmsbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.major.pmsbackend.service.AuthenticationService;

@RestController
public class EmailVerificationController {
    private final AuthenticationService authenticationService;
    public EmailVerificationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/verifyEmail")
    public String verifyEmail(@RequestParam("token") String token) {
        try {
            authenticationService.verifyEmail(token);
            return "Email verified successfully";
        } catch (Exception e) {
            // Handle the exception appropriately. For example, you might want to log the error and return a user-friendly message.
            return "Error verifying email: " + e.getMessage();
        }
    }
}