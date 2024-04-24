package com.major.pmsbackend.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.major.pmsbackend.dto.SearchDTO;
// import com.major.pmsbackend.entity.Publications;
import com.major.pmsbackend.service.PublicationService;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/v1/publications")
public class SearchController {
    @Autowired
    private PublicationService publicationService;
    @GetMapping("/search")
    public List<SearchDTO> searchPublications(@RequestParam String query) {
        return publicationService.searchPublications(query);
    }
    @GetMapping("/searchByCategory")
    public List<SearchDTO> searchPublicationsByCategory(@RequestParam String query) {
        return publicationService.searchPublicationsByCategory(query);
    }
    @GetMapping("/searchByCoAuthor")
    public List<SearchDTO> searchPublicationsByCoAuthor(@RequestParam String query) {
        return publicationService.searchPublicationsByCoAuthor(query);
    }
    @GetMapping("/searchByPublisher")
    public List<SearchDTO> searchPublicationsByPublisher(@RequestParam String query) {
        return publicationService.searchPublicationsByPublisher(query);
    }
    @GetMapping("/searchByLanguage")
    public List<SearchDTO> searchPublicationsByLanguage(@RequestParam String query) {
        return publicationService.searchPublicationsByLanguage(query);
    }
    @GetMapping("/searchByCountry")
    public List<SearchDTO> searchPublicationsByCountry(@RequestParam String query) {
        return publicationService.searchPublicationsByCountry(query);
    }
    @GetMapping("/searchByPublishedDate")
    public List<SearchDTO> searchPublicationsByPublishedDate(@RequestParam Date query) {
        return publicationService.searchPublicationsByPublishedDate(query);
    }

}
