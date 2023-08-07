package com.stackroute.orderservice.service;

import com.stackroute.orderservice.exception.OrderAlreadyExistingException;
import com.stackroute.orderservice.exception.OrderNotFoundException;
import com.stackroute.orderservice.model.Order;
public interface OrderService {
    Order createOrder(Order order) throws OrderAlreadyExistingException;
    Order getOrderById(Long orderId) throws OrderNotFoundException;
    void deleteOrderById(Long orderId) throws OrderNotFoundException;
}
