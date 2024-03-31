package com.major.pmsbackend.controller;

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

}
