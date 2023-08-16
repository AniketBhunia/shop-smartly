package com.stackroute.sellerservice.model;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Seller {
    @Transient
    public static final String SEQUENCE_NAME = "seller_sequence";
    @Id
    private int sellerId ;
    @NotBlank
    private String sellerName ;
    @NotBlank
    private String sellerEmail;
    @NotBlank
    private String sellerPassword;

    private String sellerGender ;
    @NotBlank
    private String sellerPhoneNo;
    @NotBlank
    private int sellerAge;



    private enum roles{
        user,
        seller,

    }

    private roles role;



}
