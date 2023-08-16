package com.stackroute.userservice.model;


import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";
    @Id
    private int userId ;
    @NotBlank
    private String userName ;
    @NotBlank
    private String userEmail;
    @NotBlank
    private String userPassword;

    private String userGender ;
    @NotBlank
    private String userPhoneNo;
    @NotBlank
    private int userAge;
    @NotBlank
    private String addressList;
    private enum roles{
        user,
        seller,
    }

    private roles role;


}
