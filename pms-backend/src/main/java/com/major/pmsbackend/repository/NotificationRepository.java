package com.major.pmsbackend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.major.pmsbackend.entity.Notifications;

public interface NotificationRepository extends JpaRepository<Notifications, Long>{
    List<Notifications> findByUserId(Long userId);
    List<Notifications> findByStatus(int status);
    List<Notifications> findByCreatedDate(Date createdDate);
    List<Notifications> findByStatusAndCreatedDate(int status, Date createdDate, Sort sort);
}
