package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.entity.CartItem;
import com.shoppit.ecommerce.exception.CartItemException;
import com.shoppit.ecommerce.exception.UserException;

public interface CartItemService {
    CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;

    void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;

    CartItem findCartItemById(Long id) throws CartItemException;
}
