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
    private String id;
    private String userId;
    private String title;
    private String description;
    private String category;
    private String language;
    private String country;
    private String author;
    private Date publishedDate;
    private String coAuthor;
    private String pageNo;
    private String volumeNo;
    private String issueNo;
    private String chapterNo;
    private String isbn;
    private String publisher;    
    // private byte[] data;
    // private byte[] thumbnail;
    
}
