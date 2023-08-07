package com.stackroute.productservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND , reason = "Product with seller id is not found")
public class SellerIdNotFoundException extends Exception{

}
