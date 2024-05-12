package com.major.pmsbackend.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
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

import com.fasterxml.jackson.databind.ObjectMapper;
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
        Publications savedPublication = publicationRepository.save(Publications.builder().title(publication.getTitle())
                .description(publication.getDescription())
                .category(publication.getCategory())
                .language(publication.getLanguage())
                .country(publication.getCountry())
                .chapterNo(publication.getChapterNo())
                .coAuthor(publication.getCoAuthor())
                .isbn(publication.getIsbn())
                .publisher(publication.getPublisher())
                .pageNo(publication.getPageNo())
                .volumeNo(publication.getVolumeNo())
                .issueNo(publication.getIssueNo())
                .author(publication.getAuthor())
                .publishedDate(publication.getPublishedDate())
                .user(publication.getUser())
                .data(DataUtils.compressData(file.getBytes()))
                .build());

        return "File uploaded successfully : " + savedPublication.getId();

    }

    public byte[] downloadPublication(String id) {
        Publications publication = publicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Publication not found for id: " + id));
        return DataUtils.decompressData(publication.getData());
    }

    public List<PublicationDTO> getPublicationsByUserId(String userId) {
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
        dto.setChapterNo(publication.getChapterNo());
        dto.setCoAuthor(publication.getCoAuthor());
        dto.setIsbn(publication.getIsbn());
        dto.setPublisher(publication.getPublisher());
        dto.setPageNo(publication.getPageNo());
        dto.setVolumeNo(publication.getVolumeNo());
        dto.setIssueNo(publication.getIssueNo());
        dto.setAuthor(publication.getAuthor());
        dto.setPublishedDate(publication.getPublishedDate());
        // if (publication.getData() != null) {
        // dto.setData(DataUtils.decompressData(publication.getData()));
        // } else {
        // dto.setData(null);
        // }

        return dto;
    }

    public void deletePublication(String id) {
        publicationRepository.deleteById(id);
    }

    public void updatePublication(String id, Publications updatedPublication) {
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
            if (updatedPublication.getChapterNo() != null) {
                publication.setChapterNo(updatedPublication.getChapterNo());
            }
            if (updatedPublication.getCoAuthor() != null) {
                publication.setCoAuthor(updatedPublication.getCoAuthor());
            }
            if (updatedPublication.getIsbn() != null) {
                publication.setIsbn(updatedPublication.getIsbn());
            }
            if (updatedPublication.getPublisher() != null) {
                publication.setPublisher(updatedPublication.getPublisher());
            }
            if (updatedPublication.getPageNo() != null) {
                publication.setPageNo(updatedPublication.getPageNo());
            }
            if (updatedPublication.getVolumeNo() != null) {
                publication.setVolumeNo(updatedPublication.getVolumeNo());
            }
            if (updatedPublication.getIssueNo() != null) {
                publication.setIssueNo(updatedPublication.getIssueNo());
            }

            publicationRepository.save(publication);
        } else {
            throw new NoSuchElementException("No publication found with id " + id);
        }
    }

    public List<SearchDTO> searchPublications(String partialTitle) {
        if (partialTitle == null || partialTitle.trim().isEmpty()) {
            return new ArrayList<>();
        }
        Set<Publications> results = new HashSet<>(publicationRepository.findByTitleStartingWithIgnoreCase(partialTitle));
        results.addAll(publicationRepository.findByAuthorStartingWithIgnoreCase(partialTitle));
        Set<Publications> results2 = new HashSet<>(
                publicationRepository.findByAuthorStartingWithIgnoreCase(partialTitle));
        results.addAll(results2);
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    public List<SearchDTO> searchPublicationsByCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            return new ArrayList<>();
        }
        Set<Publications> results = new HashSet<>(
                publicationRepository.findByCategoryStartingWithIgnoreCase(category));
        results.addAll(publicationRepository.findByCategoryStartingWithIgnoreCase(category));
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    public List<SearchDTO> searchPublicationsByCountry(String country) {
        if (country == null || country.trim().isEmpty()) {
            return new ArrayList<>();
        }
        Set<Publications> results = new HashSet<>(
                publicationRepository.findByCountryStartingWithIgnoreCase(country));
        results.addAll(publicationRepository.findByCountryStartingWithIgnoreCase(country));
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    public List<SearchDTO> searchPublicationsByLanguage(String language) {
        if (language == null || language.trim().isEmpty()) {
            return new ArrayList<>();
        }
        Set<Publications> results = new HashSet<>(
                publicationRepository.findByLanguageStartingWithIgnoreCase(language));
        results.addAll(publicationRepository.findByLanguageStartingWithIgnoreCase(language));
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    public List<SearchDTO> searchPublicationsByPublisher(String publisher) {
        if (publisher == null || publisher.trim().isEmpty()) {
            return new ArrayList<>();
        }
        Set<Publications> results = new HashSet<>(
                publicationRepository.findByPublisherStartingWithIgnoreCase(publisher));
        results.addAll(publicationRepository.findByPublisherStartingWithIgnoreCase(publisher));
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    public List<SearchDTO> searchPublicationsByCoAuthor(String coAuthor) {
        if (coAuthor == null ||coAuthor.trim().isEmpty()) {
            return new ArrayList<>();
        }
        Set<Publications> results = new HashSet<>(
                publicationRepository.findByCoAuthorStartingWithIgnoreCase(coAuthor));
        results.addAll(publicationRepository.findByCoAuthorStartingWithIgnoreCase(coAuthor));
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    public List<SearchDTO> searchPublicationsByPublishedDate(Date date) {
        if (date == null) {
            return new ArrayList<>();
        }
        Set<Publications> results = new HashSet<>(publicationRepository.findByPublishedDateContainingIgnoreCase(date));
        results.addAll(publicationRepository.findByPublishedDateContainingIgnoreCase(date));
        return results.stream().map(this::convertToSearchDTO).collect(Collectors.toList());
    }

    private SearchDTO convertToSearchDTO(Publications publication) {
        SearchDTO dto = new SearchDTO();
        dto.setAuthor(publication.getAuthor());
        // dto.setCategory(publication.getCategory());
        // dto.setCountry(publication.getCountry());
        // dto.setData(publication.getData());
        dto.setDescription(publication.getDescription());
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
        dto.setId(publication.getId());
        dto.setAuthor(publication.getAuthor());
        dto.setCategory(publication.getCategory());
        dto.setCountry(publication.getCountry());
        byte[] decompressedData = DataUtils.decompressData(publication.getData());
        String base64Data = Base64.getEncoder().encodeToString(decompressedData);
        dto.setData(base64Data);
        dto.setDescription(publication.getDescription());
        dto.setLanguage(publication.getLanguage());
        dto.setPublished_date(publication.getPublishedDate());
        dto.setTitle(publication.getTitle());
        dto.setIssueNo(publication.getIssueNo());
        dto.setVolumeNo(publication.getVolumeNo());
        dto.setPageNo(publication.getPageNo());
        dto.setCoAuthor(publication.getCoAuthor());
        dto.setIsbn(publication.getIsbn());
        dto.setPublisher(publication.getPublisher());
        dto.setChapterNo(publication.getChapterNo());

        return dto;
    }

    public List<PublicationDTO> getAllPublications() {
        List<Publications> publications = publicationRepository.findAll();
        return publications.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public String preprocessPublications(String userId) {
        StringBuilder output = new StringBuilder();
        StringBuilder errors = new StringBuilder();
        try {
            // Fetch the list of publications
            List<PublicationDTO> publications = this.getAllPublications();
            List<PublicationDTO> userPublications = this.getPublicationsByUserId(userId);
            // Convert the list of publications to a JSON string
            ObjectMapper mapper = new ObjectMapper();
            String jsonPublications = mapper.writeValueAsString(publications);
            String jsonUserPublications = mapper.writeValueAsString(userPublications);

            // Write the JSON strings to files
            Path publicationsPath = Files.write(Paths.get("publications.json"), jsonPublications.getBytes());
            Path userPublicationsPath = Files.write(Paths.get("user_publications.json"),
                    jsonUserPublications.getBytes());

            // Call the Python script and pass the file paths as arguments
            ProcessBuilder processBuilder = new ProcessBuilder("python", "scripts/nlp_preprocessing.py",
                    publicationsPath.toString(), userPublicationsPath.toString());
            Process process = processBuilder.start();

            BufferedReader outputReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            while ((line = outputReader.readLine()) != null) {
                output.append(line);
                output.append('\n');
            }
            while ((line = errorReader.readLine()) != null) {
                errors.append(line);
                errors.append('\n');
            }

            int exitCode = process.waitFor();
            System.out.println("\nExited with error code : " + exitCode);
            System.out.println("\nErrors: " + errors.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return output.toString();
    }
}
