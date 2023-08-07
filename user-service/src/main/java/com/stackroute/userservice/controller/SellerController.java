package com.stackroute.userservice.controller;

import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.SellerService;
import com.stackroute.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/seller")
public class SellerController {
    @Autowired
    private SellerService sellerService;
    @PostMapping("/register")
    public ResponseEntity<?> doRegister(@RequestBody User user){
        User u=sellerService.doRegister(user);
        if(u==null){
            return new ResponseEntity<>("User Already exists", HttpStatus.CONFLICT);

        }else {
            return new ResponseEntity<>("user registered", HttpStatus.CREATED);

        }
    }
}
