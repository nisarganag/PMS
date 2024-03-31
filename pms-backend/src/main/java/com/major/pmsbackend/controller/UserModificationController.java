package com.major.pmsbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.major.pmsbackend.entity.Users;
import com.major.pmsbackend.repository.UserRepo;
import com.major.pmsbackend.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserModificationController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepository;

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = auth.getName();
        @SuppressWarnings("null")
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + userId));
        if (user != null && user.getEmail().equals(loggedInUsername)) {
            userService.deleteUser(user.getId());
            return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");

        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User cannot be deleted");
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updatePublication(@PathVariable Long userId, @RequestBody Users updatedUser) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = auth.getName();
        @SuppressWarnings("null")
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + userId));
        if (user.getEmail().equals(loggedInUsername)) {
            userService.updateUser(userId, updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body("Publication updated successfully");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this publication");
    }
    @PutMapping(value="/update/photo/{userId}")
    public ResponseEntity<?> updatePublication(@PathVariable Long userId,@RequestParam ("photo") MultipartFile file) throws Exception{
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = auth.getName();
        @SuppressWarnings("null")
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + userId));
        if (user.getEmail().equals(loggedInUsername)) {
            userService.updateUserPhoto(userId,file);
            return ResponseEntity.status(HttpStatus.OK).body("Publication updated successfully");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this publication");
    }
}
