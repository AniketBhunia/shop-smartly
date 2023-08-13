package com.stackroute.orderservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND , reason = "Cart with specified id is not found")
public class CartItemNotFoundException extends Exception {
}