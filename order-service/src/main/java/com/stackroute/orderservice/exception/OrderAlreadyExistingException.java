package com.stackroute.orderservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT , reason = "Order already exists")
public class OrderAlreadyExistingException extends Exception{
}
