package com.stackroute.reviewservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND , reason = "Review with product id is not found")
public class ProIdNotFoundException extends Exception{
}
