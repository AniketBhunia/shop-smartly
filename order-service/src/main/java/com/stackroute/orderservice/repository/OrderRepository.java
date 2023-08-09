package com.stackroute.orderservice.repository;

import com.stackroute.orderservice.model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, Long> {
}