package com.stackroute.orderservice.service;

import com.stackroute.orderservice.exception.OrderAlreadyExistingException;
import com.stackroute.orderservice.exception.OrderNotFoundException;
import com.stackroute.orderservice.model.Cart;
import com.stackroute.orderservice.model.Order;
import com.stackroute.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    List<Order> orderItems = new ArrayList<>();
    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> createOrder(List<Cart> cartItems) throws OrderAlreadyExistingException {
        for (Cart cartItem : cartItems) {
            Order order = new Order();
            order.setProductId(cartItem.getProductId());
//            order.setQuantity(cartItem.getQuantity());
            Long randomOrderId = generateRandomOrderId();
            order.setOrderId(randomOrderId);
            order.setPay("Card");
            order.setStatus("Ordered");
            order.setProductName(cartItem.getProductName());
//            order.se
            order.setProductImage(cartItem.getProductImage());
            // ... set other order item properties

            orderItems.add(order);
        }

        // Save order items to the database (use your OrderRepository)

        return orderItems;
    }
    private Long generateRandomOrderId() {
        // You can adjust the range of random order IDs as needed
        Random random = new Random();
        return (long) (1000 + random.nextInt(9000)); // Generates IDs in the range of 1000 to 9999
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
