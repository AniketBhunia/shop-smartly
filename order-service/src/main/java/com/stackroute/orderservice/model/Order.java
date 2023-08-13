package com.stackroute.orderservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@Document
public class Order {
    @Id
    private Long orderId;
    private Long userId;
    private String status;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime orderDate;
    private Double totalAmount;
    private Integer pay;
    private Long productId;
    private String productName;
    private String productImage;

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = LocalDateTime.now();;
    }
}
