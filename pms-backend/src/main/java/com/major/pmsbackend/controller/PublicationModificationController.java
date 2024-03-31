package com.major.pmsbackend.controller;

import java.util.NoSuchElementException;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;
import com.major.pmsbackend.entity.Publications;
import com.major.pmsbackend.entity.Users;
import com.major.pmsbackend.repository.PublicationRepository;
import com.major.pmsbackend.repository.UserRepo;
import com.major.pmsbackend.service.PublicationService;

@RestController
@RequestMapping("/api/v1/publications")
public class PublicationModificationController {
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private PublicationRepository publicationRepository;

    @SuppressWarnings("null")
    @DeleteMapping("/{userId}/delete/{id}")
    public ResponseEntity<?> deletePublication(@PathVariable Long userId, @PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = auth.getName();

        // Retrieve the logged-in user
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + userId));

        // Check if the logged-in user is authorized to delete the publication
        if (user.getEmail().equals(loggedInUsername)) {
            // Retrieve the publication by ID

            Optional<Publications> optionalPublication = publicationRepository.findById(id);
            if (optionalPublication.isPresent()) {
                Publications publication = optionalPublication.get();

                // Check if the publication belongs to the logged-in user
                if (publication.getUser().getId().equals(userId)) {
                    // Delete the publication if it belongs to the logged-in user
                    publicationService.deletePublication(id);
                    return ResponseEntity.status(HttpStatus.OK).body("Publication deleted successfully");
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body("You are not authorized to delete this publication");
                }
            } else {
                throw new NoSuchElementException("No publication found with id " + id);
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You are not authorized to delete this publication");
        }
    }

    @PutMapping("/{userId}/update/{id}")
    public ResponseEntity<?> updatePublication(@PathVariable Long userId, @PathVariable Long id,
            @RequestBody Publications updatedPublication) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = auth.getName();
        @SuppressWarnings("null")
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + userId));

        // Check if the logged-in user is authorized to update the publication
        if (user.getEmail().equals(loggedInUsername)) {
            // Check if the publication belongs to the logged-in user
            @SuppressWarnings("null")
            Optional<Publications> optionalPublication = publicationRepository.findById(id);
            if (optionalPublication.isPresent()) {
                Publications publication = optionalPublication.get();
                if (publication.getUser().getId().equals(userId)) {
                    // Update the publication only if it belongs to the logged-in user
                    publicationService.updatePublication(id, updatedPublication);
                    return ResponseEntity.status(HttpStatus.OK).body("Publication updated successfully");
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body("You are not authorized to update this publication");
                }
            } else {
                throw new NoSuchElementException("No publication found with id " + id);
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You are not authorized to update this publication");
        }
    }

}
