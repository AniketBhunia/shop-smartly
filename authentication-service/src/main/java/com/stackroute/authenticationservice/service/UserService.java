package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exception.UserNotFound;
import com.stackroute.authenticationservice.model.User;

import java.util.List;

public interface UserService {
    public User findByUsernameAndPassword(String email,String password)throws UserNotFound;
}
