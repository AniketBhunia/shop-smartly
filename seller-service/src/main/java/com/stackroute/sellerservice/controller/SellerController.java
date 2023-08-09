package com.stackroute.sellerservice.controller;

import com.stackroute.sellerservice.model.Seller;
import com.stackroute.sellerservice.service.SellerService;

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
    public ResponseEntity<?> doRegister(@RequestBody Seller seller){

        Seller u=sellerService.doRegister(seller);
        if(u==null){
            return new ResponseEntity<>("User Already exists", HttpStatus.CONFLICT);

        }else {
            return new ResponseEntity<>("user registered", HttpStatus.CREATED);

        }
    }
}
