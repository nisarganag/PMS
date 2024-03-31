package com.major.pmsbackend.dto;

// import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchDTO {
    private String author;
    // private String category;
    // private String country;
    // private byte[] data;
    // private String description;
    // private String language;
    // private Date published_date;
    // private String source;
    private String title;
}
