package com.stackroute.orderservice.service;

import com.stackroute.orderservice.exception.OrderAlreadyExistingException;
import com.stackroute.orderservice.exception.OrderNotFoundException;
import com.stackroute.orderservice.model.Order;
import com.stackroute.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order createOrder(Order order) throws OrderAlreadyExistingException {
        // Business logic to create order
        // Check if order already exists and throw exception if needed

        if (orderRepository.existsById(order.getOrderId())) {
            throw new OrderAlreadyExistingException();
        }

        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) throws OrderNotFoundException {
        return orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
    }

    @Override
    public void deleteOrderById(Long orderId) throws OrderNotFoundException {
        if (!orderRepository.existsById(orderId)) {
            throw new OrderNotFoundException();
        }
        orderRepository.deleteById(orderId);
    }
}
