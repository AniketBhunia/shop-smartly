package com.stackroute.authenticationservice.model;


import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;


import org.springframework.data.annotation.Transient;


@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";
    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String email;
    @Getter
    @Setter
    private String password;
//    @Getter
//    @Setter
//    private Enum role;




}
