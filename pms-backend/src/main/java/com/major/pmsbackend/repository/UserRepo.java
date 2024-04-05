package com.major.pmsbackend.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.major.pmsbackend.entity.Users;


@Repository
public interface UserRepo extends MongoRepository<Users, String>{
    
    Optional<Users> findByEmail(String email);
}
