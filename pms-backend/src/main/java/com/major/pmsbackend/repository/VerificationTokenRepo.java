package com.major.pmsbackend.repository;

import com.major.pmsbackend.entity.VerificationToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VerificationTokenRepo extends MongoRepository<VerificationToken, String> {
    Optional<VerificationToken> findByToken(String token);
}