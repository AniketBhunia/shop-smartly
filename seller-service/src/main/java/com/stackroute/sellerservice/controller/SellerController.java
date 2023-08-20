package com.stackroute.sellerservice.controller;

import com.stackroute.sellerservice.model.Seller;
import com.stackroute.sellerservice.service.SellerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seller")
public class SellerController {
    @Autowired
    private SellerService sellerService;
    @PostMapping("/register")
    @CrossOrigin("http://localhost:4200/")
    public ResponseEntity<?> doRegister(@RequestBody Seller seller){

        Seller u=sellerService.doRegister(seller);

        if(u==null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"Seller Already exists\"}");

        }else {
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"Seller registered\"}");

        }

    }
}
