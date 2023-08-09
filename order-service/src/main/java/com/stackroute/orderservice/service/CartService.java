package com.stackroute.orderservice.service;

import com.stackroute.orderservice.model.Cart;

public interface CartService {
    Cart addToCart(Cart cart);
    Cart getCartById(Long cartId);
    void deleteCartById(Long cartId);
}
