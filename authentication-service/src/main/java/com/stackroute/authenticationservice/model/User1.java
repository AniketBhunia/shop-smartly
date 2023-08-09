package com.stackroute.authenticationservice.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User1 {
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
    public enum roles{
        user,
        seller,

    }

    public roles role;



}
