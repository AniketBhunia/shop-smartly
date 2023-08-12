package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.exception.UserNotFound;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.service.JwtTokenGenerator;
import com.stackroute.authenticationservice.service.UserService;
import com.stackroute.authenticationservice.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;
    private ResponseEntity responseEntity;
    @PostMapping("/login")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity loginUser(@RequestBody User user) throws UserNotFound {

        Map<String, String> map = null;
        try {
            User userObj = userService.findByUsernameAndPassword(user.getEmail(), user.getPassword());
            if (userObj.getEmail().equals(user.getEmail())) {
                map = jwtTokenGenerator.generateToken(user); // token is generated
            }
             responseEntity = new ResponseEntity(map, HttpStatus.OK);
        }
        catch(UserNotFound e){
            throw new UserNotFound();
        }
        catch (Exception e){
            responseEntity = new ResponseEntity("Try after sometime!!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

}
