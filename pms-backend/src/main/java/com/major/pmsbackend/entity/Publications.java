package com.major.pmsbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="publications")
public class Publications {
    @Id
    private String id;
    private String title;
    private String coAuthor;
    private String pageNo;
    private String volumeNo;
    private String issueNo;
    private String chapterNo;
    private String isbn;
    private String publisher;    
    private String description;
    private String category;
    private String language;
    private String country;
    private String author;
    private Date publishedDate;
    private byte[] data;

    @DBRef
    @JsonBackReference
    private Users user;
}