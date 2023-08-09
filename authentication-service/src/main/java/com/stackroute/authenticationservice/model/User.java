package com.stackroute.authenticationservice.model;


import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;


import org.springframework.data.annotation.Transient;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;

    private String name;

    private String email;

    private String password;
    public enum roles{
        user,
        seller,

    }

    private roles role;




}
