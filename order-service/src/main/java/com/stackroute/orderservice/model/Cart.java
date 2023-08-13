package com.stackroute.orderservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Cart {
    @Id
    private Long cartId;
    private Long userId;
    private Double cartTotalPrice;
    private Long productId;
    private String productImage;
    private Double productPrice;
    private Integer productQuantity;
}
