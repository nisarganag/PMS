package com.major.pmsbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.major.pmsbackend.dto.PublicationDTO;
import com.major.pmsbackend.dto.ViewEachPublicationDTO;
import com.major.pmsbackend.entity.Publications;
import com.major.pmsbackend.service.PdfService;
import com.major.pmsbackend.service.PublicationService;

@RestController
@RequestMapping("/api/v1/publications")
public class PublicationController {
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private PdfService pdfService;

    @Secured("USER")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPublication(@RequestParam("data") MultipartFile file,
            @RequestParam("publication") String publicationJson) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Publications publication = objectMapper.readValue(publicationJson, Publications.class);
        String uploadPublication = publicationService.uploadPublication(file, publication);
        return ResponseEntity.status(HttpStatus.OK).body(uploadPublication);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadPublication(@PathVariable Long id) {
        byte[] downloadPublication = publicationService.downloadPublication(id);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("application/pdf"))
                .body(downloadPublication);
    }

    @GetMapping("/all/{userId}")
    public List<PublicationDTO> getAllPublicationsByUserId(@PathVariable Long userId) {
        return publicationService.getPublicationsByUserId(userId);
    }

    @GetMapping(value="/view/image/{id}",produces=MediaType.IMAGE_PNG_VALUE)
    public byte[] viewFirstPage(@PathVariable Long id) {
        byte[] pdfBytes = pdfService.getPdfBytesById(id); // Fetch PDF blob from database
        return pdfService.extractFirstPage(pdfBytes); // Extract and return first page as PNG
    }
    
    @GetMapping(value="/view/{title}")
    public List<ViewEachPublicationDTO> viewPublicationDetail(@PathVariable String title) {
        return publicationService.getPublicationsByTitle(title); // Extract and return first page as PNG
    }
}