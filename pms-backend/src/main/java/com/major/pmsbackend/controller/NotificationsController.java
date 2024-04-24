package com.major.pmsbackend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.major.pmsbackend.dto.NotificationDTO;
import com.major.pmsbackend.entity.Notifications;
import com.major.pmsbackend.entity.Users;
import com.major.pmsbackend.repository.NotificationRepository;
import com.major.pmsbackend.repository.UserRepo;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationsController {
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    UserRepo userRepository;

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAllNotifications(@PathVariable String userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = auth.getName();

        // Retrieve the logged-in user
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + userId));

        // Check if the logged-in user is authorized to delete the publication
        if (user.getEmail().equals(loggedInUsername)) {
            // Retrieve the publication by ID
            List<Notifications> notifications = notificationRepository.findByUserId(userId);
            List<NotificationDTO> notificationDTOs = notifications.stream()
                    .map(notification -> {
                        NotificationDTO dto = new NotificationDTO();
                        dto.setId(notification.getId());
                        dto.setMessage(notification.getMessage());
                        dto.setStatus(notification.getStatus());
                        dto.setCreatedDate(notification.getCreatedDate());
                        return dto;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(notificationDTOs);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You are not authorized to see the notifications");
        }
    }

    @PutMapping("/updateNotificationStatus/{userId}")
    public ResponseEntity<?> updateNotificationStatus(@PathVariable String userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = auth.getName();

        // Retrieve the logged-in user
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + userId));

        // Check if the logged-in user is authorized to update the notifications
        if (user.getEmail().equals(loggedInUsername)) {
            List<Notifications> notifications = notificationRepository.findByUserId(userId);

            notifications.forEach(notification -> {
                notification.setStatus(1);
                notificationRepository.save(notification);
            });

            return ResponseEntity.ok("All notification statuses have been updated to 1 for user: " + userId);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You are not authorized to update the notifications");
        }
    }
}
