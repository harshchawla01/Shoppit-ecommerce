package com.shoppit.ecommerce.service.impl;

import com.shoppit.ecommerce.entity.Cart;
import com.shoppit.ecommerce.entity.CartItem;
import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.repository.CartItemRepository;
import com.shoppit.ecommerce.repository.CartRepository;
import com.shoppit.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ConcurrentModificationException;
import java.util.HashSet;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);

        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);
        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setSize(size);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());

            int totalPrice = quantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);

            int totalMrpPrice = quantity * product.getMrpPrice();
            cartItem.setMrpPrice(totalMrpPrice);

            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);
//            cartRepository.save(cart);
            return cartItemRepository.save(cartItem);

//            // Create a new HashSet to avoid concurrent modification
//            Set<CartItem> updatedItems = new HashSet<>(cart.getCartItems());
//            updatedItems.add(cartItem);
//            cart.setCartItems(updatedItems);
//
//            cartItem.setCart(cart);
//            cart = cartRepository.save(cart);
//
//            // Find the newly added item in the saved cart
//            for (CartItem item : cart.getCartItems()) {
//                if (item.getProduct().getId().equals(product.getId()) &&
//                        item.getSize().equals(size)) {
//                    return item;
//                }
//            }
//            return cartItem;
        }
        return isPresent;
    }

    @Override
    @Transactional
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int numberOfItems = 0;

        for(CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice() * cartItem.getQuantity();
            totalDiscountedPrice += cartItem.getSellingPrice() * cartItem.getQuantity();
            numberOfItems += cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setNumberOfItems(numberOfItems);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
        System.out.println("Number of Cart items: " + numberOfItems);
        return cart;
    }

//    @Override
//    @Transactional(isolation = Isolation.READ_COMMITTED)
//    public Cart findUserCart(User user) {
//        Cart cart = null;
//        int maxRetries = 3;
//        int attemptCount = 0;
//
//        while (attemptCount < maxRetries) {
//            try {
//                cart = cartRepository.findByUserId(user.getId());
//
//                int totalPrice = 0;
//                int totalDiscountedPrice = 0;
//                int numberOfItems = 0;
//
//                for(CartItem cartItem : cart.getCartItems()) {
//                    totalPrice += cartItem.getMrpPrice();
//                    totalDiscountedPrice += cartItem.getSellingPrice();
//                    numberOfItems += cartItem.getQuantity();
//                }
//
//                cart.setTotalMrpPrice(totalPrice);
//                cart.setTotalSellingPrice(totalDiscountedPrice);
//                cart.setNumberOfItems(numberOfItems);
//                cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
//
//                return cart;
//            } catch (ConcurrentModificationException e) {
//                attemptCount++;
//                if (attemptCount >= maxRetries) {
//                    throw e;
//                }
//                try {
//                    Thread.sleep(100); // Brief pause before retrying
//                } catch (InterruptedException ie) {
//                    Thread.currentThread().interrupt();
//                    throw new RuntimeException("Thread interrupted", ie);
//                }
//            }
//        }
//
//        return cart;
//    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice <= 0) {
            return 0;
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }
}
