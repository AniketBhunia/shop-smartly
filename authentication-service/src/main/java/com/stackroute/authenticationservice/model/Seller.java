package com.stackroute.authenticationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seller {

    @Id
    private int sellerId ;

    private String sellerName ;

    private String sellerEmail;

    private String sellerPassword;

    private String sellerGender ;

    private String sellerPhoneNo;

    private int sellerAge;



    private enum roles{
        user,
        seller,

    }

    public roles role;



}
