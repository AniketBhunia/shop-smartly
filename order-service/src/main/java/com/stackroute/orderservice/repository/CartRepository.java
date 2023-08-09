package com.stackroute.orderservice.repository;

import com.stackroute.orderservice.model.Cart;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, Long> {
}