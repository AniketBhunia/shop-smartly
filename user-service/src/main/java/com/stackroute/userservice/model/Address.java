package com.stackroute.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private int addressId;
    private String addressLine1;
    private String  addressLine2;
    private String state;
    private String city;
    private String landmark;
    private String houseNo;
    private String pinCode;

}
