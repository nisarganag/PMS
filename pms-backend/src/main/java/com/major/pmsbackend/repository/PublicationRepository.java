package com.major.pmsbackend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.major.pmsbackend.entity.Publications;
import com.major.pmsbackend.entity.Users;

public interface PublicationRepository extends MongoRepository<Publications, String>{
    List<Publications> findByUser(Users user);
    List<Publications> findByTitle(String title);
    List<Publications> findByCategory(String category);
    List<Publications> findByLanguage(String language);
    List<Publications> findByCountry(String country);
    List<Publications> findByAuthor(String author);
    List<Publications> findByPublishedDate(Date Date);
    List<Publications> findByChapterNo(String chapterNo);
    List<Publications> findByVolumeNo(String volumeNo);
    List<Publications> findByIssueNo(String issueNo);
    List<Publications> findByIsbn(String isbn);
    List<Publications> findByPublisher(String publisher);
    List<Publications> findByCoAuthor(String coAuthor);
    List<Publications> findByPageNo(String issueNo);
    List<Publications> findByUserAndCategory(Users user, String category);
    List<Publications> findByUserAndLanguage(Users user, String language);
    List<Publications> findByUserAndCountry(Users user, String country);
    List<Publications> findByUserAndAuthor(Users user, String author);
    List<Publications> findByUserAndTitle(Users user, String title);
    List<Publications> findByUserAndPublishedDate(Users user, Date Date);
    List<Publications> findByUserAndChapterNo(Users user, String chapterNo);
    List<Publications> findByUserAndVolumeNo(Users user, String volumeNo);
    List<Publications> findByUserAndIssueNo(Users user, String issueNo);
    List<Publications> findByUserAndIsbn(Users user, String isbn);
    List<Publications> findByUserAndPublisher(Users user, String publisher);
    List<Publications> findByUserAndTitleAndCategory(Users user, String title, String category);
    List<Publications> findByUserAndTitleAndLanguage(Users user, String title, String language);
    List<Publications> findByUserAndTitleAndCountry(Users user, String title, String country);
    List<Publications> findByUserAndTitleAndAuthor(Users user, String title, String author);
    List<Publications> findByUserAndCategoryAndLanguage(Users user, String category, String language);
    List<Publications> findByUserAndCategoryAndCountry(Users user, String category, String country);
    List<Publications> findByUserAndCategoryAndAuthor(Users user, String category, String author);
    List<Publications> findByUserAndLanguageAndCountry(Users user, String language, String country);
    List<Publications> findByUserAndLanguageAndAuthor(Users user, String language, String author);
    List<Publications> findByUserId(String userId);
    List<Publications> findByTitleStartingWithIgnoreCase(String title);
    List<Publications> findByAuthorStartingWithIgnoreCase(String category);
    List<Publications> findByTitleContainingIgnoreCase(String title);
    List<Publications> findByCategoryStartingWithIgnoreCase(String category);
    List<Publications> findByLanguageStartingWithIgnoreCase(String language);
    List<Publications> findByCountryStartingWithIgnoreCase(String country);
    List<Publications> findByPublisherStartingWithIgnoreCase(String publisher);
    List<Publications> findByCoAuthorStartingWithIgnoreCase(String coAuthor);
    List<Publications> findByPublishedDateContainingIgnoreCase(Date date);
    List<Publications> findByAuthorContainingIgnoreCase(String author);
}