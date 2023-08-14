package com.stackroute.orderservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Cart already exists")
public class CartAlreadyExistingException extends Exception {
    public CartAlreadyExistingException(String message) {
        super(message);
    }
}