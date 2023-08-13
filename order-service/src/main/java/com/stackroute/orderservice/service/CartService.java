package com.stackroute.orderservice.service;

import com.stackroute.orderservice.exception.CartAlreadyExistingException;
import com.stackroute.orderservice.exception.CartItemNotFoundException;
import com.stackroute.orderservice.exception.OrderAlreadyExistingException;
import com.stackroute.orderservice.exception.OrderNotFoundException;
import com.stackroute.orderservice.model.Cart;

import java.util.List;

public interface CartService {
    Cart addToCart(Cart cart) throws CartAlreadyExistingException;
    Cart getCartById(Long cartId) throws CartItemNotFoundException;
    void deleteCartById(Long cartId) throws CartItemNotFoundException;


    boolean isCartAlreadyExisting(Long userId);

    List<Cart> getAllCarts() throws Exception;
}
