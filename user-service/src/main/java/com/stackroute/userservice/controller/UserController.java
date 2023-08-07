package com.stackroute.userservice.controller;


import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
        @PostMapping("/register")
        public ResponseEntity<?> doRegister(@RequestBody User user){
            User u=userService.doRegister(user);
            if(u==null){
                return new ResponseEntity<>("User Already exists",HttpStatus.CONFLICT);

            }else {
                return new ResponseEntity<>("user registered", HttpStatus.CREATED);

            }
    }
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getUser(){
        List<User> users=userService.getAllUser();
        if(users==null)
            return new ResponseEntity("no users is there",HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(userService.getAllUser(),HttpStatus.OK);
    }
}
