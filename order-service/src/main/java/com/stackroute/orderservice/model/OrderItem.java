package com.stackroute.orderservice.model;



import lombok.Data;

@Data
public class OrderItem {
    private Long productId;
    private String productName;
    private String productImage;
}

