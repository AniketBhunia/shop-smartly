package com.stackroute.orderservice.model;

import lombok.Data;


@Data
public class CartItem {
    private Long productId;
    private String productImage;
    private Double productPrice;
    private Integer productQuantity;
}
