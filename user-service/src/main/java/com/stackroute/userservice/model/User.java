package com.stackroute.userservice.model;


import lombok.*;
import org.springframework.data.annotation.Id;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";
    @Id
    @Getter
    @Setter
    private int userId ;
    @Getter
    @Setter
    private String userName ;
    @Getter
    @Setter
    private String userEmail;
    @Getter
    @Setter
    private String userPassword;
    @Getter
    @Setter
    private String userGender ;
    @Getter
    @Setter
    private String userPhoneNo;
    @Getter
    @Setter
    private int userAge;
//    @Getter
//    @Setter
//    private Address[] addressList;
//    @Getter
//    @Setter
//    private Enum Role;



}
