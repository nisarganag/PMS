package com.major.pmsbackend.service;

import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

// import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.major.pmsbackend.dto.PublicationDTO;
import com.major.pmsbackend.dto.SearchDTO;
import com.major.pmsbackend.dto.ViewEachPublicationDTO;
import com.major.pmsbackend.entity.Publications;
import com.major.pmsbackend.entity.Users;
import com.major.pmsbackend.repository.PublicationRepository;
import com.major.pmsbackend.repository.UserRepo;
import com.major.pmsbackend.utils.DataUtils;

@Service
public class PublicationService {
    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private UserRepo userRepository;

    public String uploadPublication(MultipartFile file, Publications publication) throws Exception {
        if (publication == null) {
            throw new IllegalArgumentException("Publication cannot be null");
        }

        // Get currently logged-in user's email
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Find the user by email
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));

        // Set the user to the publication
        publication.setUser(user);

        // Save the publication
        @SuppressWarnings("null")
        Publications savedPublication = publicationRepository.save(Publications.builder().title(publication.getTitle())
                .description(publication.getDescription())
                .category(publication.getCategory())
                .language(publication.getLanguage())
                .country(publication.getCountry())
                .source(publication.getSource())
                .author(publication.getAuthor())
                .publishedDate(publication.getPublishedDate())
                .user(publication.getUser())
                .data(DataUtils.compressData(file.getBytes()))
                .build());

        return "File uploaded successfully : " + savedPublication.getId();

    }

    public byte[] downloadPublication(Long id) {
        @SuppressWarnings("null")
        Publications publication = publicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Publication not found for id: " + id));
        return DataUtils.decompressData(publication.getData());
    }

    public List<PublicationDTO> getPublicationsByUserId(Long userId) {
        List<Publications> publications = publicationRepository.findByUserId(userId);
        return publications.stream()
                .filter(publication -> publication.getUser().getId().equals(userId)) // Filter by user ID
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PublicationDTO convertToDTO(Publications publication) {
        PublicationDTO dto = new PublicationDTO();
        dto.setId(publication.getId());
        dto.setUserId(publication.getUser().getId());
        dto.setTitle(publication.getTitle());
        dto.setDescription(publication.getDescription());
        dto.setCategory(publication.getCategory());
        dto.setLanguage(publication.getLanguage());
        dto.setCountry(publication.getCountry());
        dto.setSource(publication.getSource());
        dto.setAuthor(publication.getAuthor());
        dto.setPublishedDate(publication.getPublishedDate());
        // if (publication.getData() != null) {
        // dto.setData(DataUtils.decompressData(publication.getData()));
        // } else {
        // dto.setData(null);
        // }

        return dto;
    }

    @SuppressWarnings("null")
    public void deletePublication(Long id) {
        publicationRepository.deleteById(id);
    }

    @SuppressWarnings("null")
    public void updatePublication(Long id, Publications updatedPublication) {
        Optional<Publications> optionalPublication = publicationRepository.findById(id);
        if (optionalPublication.isPresent()) {
            Publications publication = optionalPublication.get();
    
            if (updatedPublication.getTitle() != null) {
                publication.setTitle(updatedPublication.getTitle());
            }
            if (updatedPublication.getAuthor() != null) {
                publication.setAuthor(updatedPublication.getAuthor());
            }
            if (updatedPublication.getCategory() != null) {
                publication.setCategory(updatedPublication.getCategory());
            }
            if (updatedPublication.getCountry() != null) {
                publication.setCountry(updatedPublication.getCountry());
            }
            if (updatedPublication.getDescription() != null) {
                publication.setDescription(updatedPublication.getDescription());
            }
            if (updatedPublication.getLanguage() != null) {
                publication.setLanguage(updatedPublication.getLanguage());
            }
            if (updatedPublication.getPublishedDate() != null) {
                publication.setPublishedDate(updatedPublication.getPublishedDate());
            }
            if (updatedPublication.getSource() != null) {
                publication.setSource(updatedPublication.getSource());
            }
    
            publicationRepository.save(publication);
        } else {
            throw new NoSuchElementException("No publication found with id " + id);
        }
    }
    

    public List<SearchDTO> searchPublications(String partialTitle) {
        Set<Publications> results = new HashSet<>(publicationRepository.findByTitleContainingIgnoreCase(partialTitle));
results.addAll(publicationRepository.findByAuthorContainingIgnoreCase(partialTitle));
Set<Publications> results2 = new HashSet<>(publicationRepository.findByAuthorContainingIgnoreCase(partialTitle));
        results.addAll(results2);
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    private SearchDTO convertToSearchDTO(Publications publication) {
        SearchDTO dto = new SearchDTO();
        dto.setAuthor(publication.getAuthor());
        // dto.setCategory(publication.getCategory());
        // dto.setCountry(publication.getCountry());
        // dto.setData(publication.getData());
        // dto.setDescription(publication.getDescription());
        // dto.setLanguage(publication.getLanguage());
        // dto.setPublished_date(publication.getPublishedDate());
        // dto.setSource(publication.getSource());
        dto.setTitle(publication.getTitle());
        return dto;
    }

    public List<ViewEachPublicationDTO> getPublicationsByTitle(String title) {
        List<Publications> results = publicationRepository.findByTitle(title);
        return results.stream().map(this::convertToViewEachPublicationDTO).collect(Collectors.toList());
    }

    private ViewEachPublicationDTO convertToViewEachPublicationDTO(Publications publication) {
        ViewEachPublicationDTO dto = new ViewEachPublicationDTO();
        dto.setAuthor(publication.getAuthor());
        dto.setCategory(publication.getCategory());
        dto.setCountry(publication.getCountry());
        byte[] decompressedData = DataUtils.decompressData(publication.getData());
        String base64Data = Base64.getEncoder().encodeToString(decompressedData);
        dto.setData(base64Data);
        dto.setDescription(publication.getDescription());
        dto.setLanguage(publication.getLanguage());
        dto.setPublished_date(publication.getPublishedDate());
        dto.setSource(publication.getSource());
        dto.setTitle(publication.getTitle());
        return dto;
    }
}
