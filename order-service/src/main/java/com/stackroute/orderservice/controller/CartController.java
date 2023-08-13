package com.stackroute.orderservice.controller;

import com.stackroute.orderservice.exception.CartAlreadyExistingException;
import com.stackroute.orderservice.exception.CartItemNotFoundException;
import com.stackroute.orderservice.model.Cart;
import com.stackroute.orderservice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Cart cart) {
        try {
//            if (cartService.isCartAlreadyExisting(cart.getUserId())) {
//                throw new CartAlreadyExistingException("Cart already exists for the user.");
//            }
            List<Cart> addedCart = cartService.addToCart(cart);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedCart);
        } catch (CartAlreadyExistingException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the cart.");
        }
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<?> getCartById(@PathVariable Long cartId) {
        try {
            List<Cart> cartList = cartService.getCartById(cartId);
            return ResponseEntity.ok(cartList);
        } catch (CartItemNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the cart.");
        }
    }


    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteCartById(@PathVariable Long productId) throws CartItemNotFoundException {
        cartService.deleteCartById(productId);
        return ResponseEntity.status(HttpStatus.OK).body("Cart data deleted successfully.");
    }
    @GetMapping("/getall")
    public ResponseEntity<?> getAllCarts() {
        try {
            List<Cart> carts = cartService.getAllCarts();
            return ResponseEntity.ok(carts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching carts.");
        }
    }
}
