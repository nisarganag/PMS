package com.major.pmsbackend.service;

import java.nio.file.AccessDeniedException;
import java.util.Base64;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.major.pmsbackend.dto.ViewUserDTO;
import com.major.pmsbackend.entity.Users;
import com.major.pmsbackend.repository.UserRepo;
import com.major.pmsbackend.utils.DataUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    @SuppressWarnings("null")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @SuppressWarnings("null")
    public void updateUser(Long id, Users updatedUser) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + id));

        if (updatedUser.getFirstName() != null) {
            user.setFirstName(updatedUser.getFirstName());
        }
        if (updatedUser.getLastName() != null) {
            user.setLastName(updatedUser.getLastName());
        }
        if (updatedUser.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        if (updatedUser.getPhone() != null) {
            user.setPhone(updatedUser.getPhone());
        }
        if (updatedUser.getGender() != null) {
            user.setGender(updatedUser.getGender());
        }

        userRepository.save(user);
    }

    public void updateUserPhoto(Long id, MultipartFile photo) throws Exception {
        @SuppressWarnings("null")
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found for id: " + id));
        user.setPhoto(DataUtils.compressData(photo.getBytes()));
        userRepository.save(user);
    }

    public ViewUserDTO getUserByEmail(String email) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Users user= userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
        // Assuming that the principal name is the user ID. If it's not, you need to
        // adjust this code.
        if (!currentPrincipalName.equals(user.getEmail())) {
            throw new AccessDeniedException("You are not authorized to view this user's details.");
        }
        Optional<Users> results = userRepository.findByEmail(email);
        return results.map(this::convertToViewUserDTO).orElse(null);
    }

    private ViewUserDTO convertToViewUserDTO(Users user) {
        ViewUserDTO dto = new ViewUserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setGender(user.getGender());
        dto.setPhone(user.getPhone());
        if (user.getPhoto() != null) {
            byte[] decompressedPhoto = DataUtils.decompressData(user.getPhoto());
            String base64Data = Base64.getEncoder().encodeToString(decompressedPhoto);
            dto.setPhoto(base64Data);
        }
        return dto;
    }
}
