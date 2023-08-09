package com.stackroute.authenticationservice.repository;

import com.stackroute.authenticationservice.model.User;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {


    Optional<User> findByEmail(String email);
    User findByEmailAndPassword(String email,String password);
}
