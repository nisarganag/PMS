package com.major.pmsbackend.repository;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.major.pmsbackend.entity.Publications;
import com.major.pmsbackend.entity.Users;
public interface PublicationRepository extends JpaRepository<Publications, Long>{
    List<Publications> findByUser(Users user);
    List<Publications> findByTitle(String title);
    List<Publications> findByCategory(String category);
    List<Publications> findByLanguage(String language);
    List<Publications> findByCountry(String country);
    List<Publications> findBySource(String source);
    List<Publications> findByAuthor(String author);
    List<Publications> findByPublishedDate(Date Date);
    List<Publications> findByUserAndCategory(Users user, String category);
    List<Publications> findByUserAndLanguage(Users user, String language);
    List<Publications> findByUserAndCountry(Users user, String country);
    List<Publications> findByUserAndSource(Users user, String source);
    List<Publications> findByUserAndAuthor(Users user, String author);
    List<Publications> findByUserAndTitle(Users user, String title);
    List<Publications> findByUserAndTitleAndCategory(Users user, String title, String category);
    List<Publications> findByUserAndTitleAndLanguage(Users user, String title, String language);
    List<Publications> findByUserAndTitleAndCountry(Users user, String title, String country);
    List<Publications> findByUserAndTitleAndSource(Users user, String title, String source);
    List<Publications> findByUserAndTitleAndAuthor(Users user, String title, String author);
    List<Publications> findByUserAndCategoryAndLanguage(Users user, String category, String language);
    List<Publications> findByUserAndCategoryAndCountry(Users user, String category, String country);
    List<Publications> findByUserAndCategoryAndSource(Users user, String category, String source);
    List<Publications> findByUserAndCategoryAndAuthor(Users user, String category, String author);
    List<Publications> findByUserAndLanguageAndCountry(Users user, String language, String country);
    List<Publications> findByUserAndLanguageAndSource(Users user, String language, String source);
    List<Publications> findByUserAndLanguageAndAuthor(Users user, String language, String author);
    List<Publications> findByUserId(Long userId);
    List<Publications> findByTitleStartingWithIgnoreCase(String title);
    List<Publications> findByAuthorStartingWithIgnoreCase(String category);
    List<Publications> findByTitleContainingIgnoreCase(String title);
    List<Publications> findByAuthorContainingIgnoreCase(String author);
}
