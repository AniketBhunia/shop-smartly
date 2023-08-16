package com.stackroute.orderservice.service;

import com.stackroute.orderservice.exception.CartAlreadyExistingException;
import com.stackroute.orderservice.exception.CartItemNotFoundException;
import com.stackroute.orderservice.model.Cart;

import java.util.List;

public interface CartService {
    List<Cart> addToCart(Cart cart) throws CartAlreadyExistingException;
    List<Cart>  getCartById(Long cartId) throws CartItemNotFoundException;
    List<Cart> deleteCartById(Long productId) throws CartItemNotFoundException;

    List<Cart> updateCartItem(long productId, int newQuantity);

    boolean isCartAlreadyExisting(Long userId);

    List<Cart> getAllCarts() throws Exception;
}
