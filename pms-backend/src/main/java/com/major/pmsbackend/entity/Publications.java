package com.major.pmsbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="publications")
public class Publications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String title;
    @Column(length = 500)
    private String description;
    @Column(length = 50)
    private String category;
    @Column(nullable = false, length = 50)
    private String language;
    @Column(length = 50)
    private String country;
    private String source;
    @Column(nullable = false)
    private String author;
    private Date publishedDate;
    @Lob
    @Column(name="data",columnDefinition="LONGBLOB")
    private byte[] data;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_Id", insertable = true, updatable = true)
    private Users user;
}
