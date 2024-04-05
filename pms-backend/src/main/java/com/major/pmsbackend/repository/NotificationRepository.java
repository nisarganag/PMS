package com.major.pmsbackend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.major.pmsbackend.entity.Notifications;

public interface NotificationRepository extends MongoRepository<Notifications, String>{
    List<Notifications> findByUserId(String userId);
    List<Notifications> findByStatus(int status);
    List<Notifications> findByCreatedDate(Date createdDate);
    List<Notifications> findByStatusAndCreatedDate(int status, Date createdDate, Sort sort);
}