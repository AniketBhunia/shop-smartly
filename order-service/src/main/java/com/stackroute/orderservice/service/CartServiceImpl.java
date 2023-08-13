package com.stackroute.orderservice.service;

import com.stackroute.orderservice.model.Cart;
import com.stackroute.orderservice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId).orElse(null);
    }

    @Override
    public void deleteCartById(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    @Override
    public boolean isCartAlreadyExisting(Long userId) {
        return false;
    }
    @Override
    public List<Cart> getAllCarts() throws Exception {
        return cartRepository.findAll();
    }
}
