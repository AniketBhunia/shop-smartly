package com.stackroute.userservice.service;

import com.stackroute.userservice.model.User;

import java.util.List;

public interface UserService {
    User doRegister(User u);
    List<User> getAllUser();
}
