package com.stackroute.orderservice.service;

import com.stackroute.orderservice.exception.OrderAlreadyExistingException;
import com.stackroute.orderservice.exception.OrderNotFoundException;
import com.stackroute.orderservice.model.Cart;
import com.stackroute.orderservice.model.Order;

import java.util.List;

public interface OrderService {
    List<Order> createOrder(List<Cart> cartItems) throws OrderAlreadyExistingException;
    Order getOrderById(Long orderId) throws OrderNotFoundException;
    void deleteOrderById(Long orderId) throws OrderNotFoundException;
}
