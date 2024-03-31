package com.major.pmsbackend.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.major.pmsbackend.entity.Users;


@Repository
public interface UserRepo extends CrudRepository<Users, Long>{
    
    @Override
    @NonNull
    <S extends Users> S save(@NonNull S entity);
    Optional<Users> findByEmail(String email);
}
