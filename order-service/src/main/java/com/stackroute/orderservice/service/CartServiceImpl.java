package com.stackroute.orderservice.service;

import com.stackroute.orderservice.model.Cart;
import com.stackroute.orderservice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    private List<Cart> cartList = new ArrayList<>();

    private final CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public List<Cart> addToCart(Cart cart) {
        cartList.add(cart);
//        cartRepository.save(cartList);
         return  cartRepository.saveAll(cartList);
//        return cartList;
    }

    @Override
    public List<Cart> getCartById(Long cartId) {
        return cartList.stream()
                .filter(cart -> cart.getCartId().equals(cartId))
                .collect(Collectors.toList());
    }

    @Override
    public List<Cart> deleteCartById(Long productId) {
        cartList.removeIf(item -> item.getProductId().equals(productId));
//        return cartRepository.saveAll(cartList);
        return cartList;
    }

    public boolean isCartAlreadyExisting(Long cartId) {
        for (Cart cart : cartList) {
            if (cart.getCartId().equals(cartId)) {
                return true;  // Found a cart with the specified ID
            }
        }
        return false;  // Cart with the specified ID not found
    }
    @Override
    public List<Cart> getAllCarts() throws Exception {
        return cartRepository.findAll();
    }
}
