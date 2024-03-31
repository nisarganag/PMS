package com.major.pmsbackend.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ViewEachPublicationDTO {
    private String author;
    private String category;
    private String country;
    private String data;
    private String description;
    private String language;
    private Date published_date;
    private String source;
    private String title;
}
