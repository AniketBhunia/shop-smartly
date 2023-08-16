package com.stackroute.authenticationservice.model;


import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Please enter user name")
    private String name;
    @NotBlank(message = "Please enter user email")
    private String email;
    @NotBlank(message = "Please enter user password")
    private String password;
    public enum roles{
        user,
        seller,

    }

    private roles role;




}
