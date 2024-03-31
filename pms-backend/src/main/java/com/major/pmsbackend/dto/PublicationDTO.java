package com.major.pmsbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublicationDTO {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private String category;
    private String language;
    private String country;
    private String source;
    private String author;
    private Date publishedDate;
    // private byte[] data;
    // private byte[] thumbnail;
    
}
