package com.stackroute.userservice.model;


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

    private String userName ;

    private String userEmail;

    private String userPassword;

    private String userGender ;

    private String userPhoneNo;

    private int userAge;

    private String addressList;
    private enum roles{
        user,
        seller,
    }

    private roles role;


}
