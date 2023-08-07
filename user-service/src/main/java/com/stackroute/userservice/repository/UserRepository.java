package com.stackroute.userservice.repository;


import com.stackroute.userservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,Integer> {


    Optional<User> findByUserEmail(String email);
}
