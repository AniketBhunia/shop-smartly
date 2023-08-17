package com.stackroute.orderservice.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long cartId;
    private Long userId;
    private Double cartTotalPrice;
    private Long productId;
    private String productName;
    private String productImage;
    private Double productPrice;
    private Integer productQuantity;
    private Boolean expanded;
    private Boolean showReviewForm;

    private  Boolean canAddReview;
}
