package com.shoppit.ecommerce.service.impl;

import com.shoppit.ecommerce.entity.CartItem;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.exception.CartItemException;
import com.shoppit.ecommerce.exception.UserException;
import com.shoppit.ecommerce.repository.CartItemRepository;
import com.shoppit.ecommerce.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException {
        CartItem cartItemToUpdate = findCartItemById(id);
        User cartItemUser = cartItemToUpdate.getCart().getUser();

        if(cartItemUser.getId().equals(userId)){ // Important
            cartItemToUpdate.setQuantity(cartItem.getQuantity());
            cartItemToUpdate.setMrpPrice(cartItem.getMrpPrice());
            cartItemToUpdate.setSellingPrice(cartItem.getSellingPrice());
            return cartItemRepository.save(cartItemToUpdate);
        }
        throw new CartItemException("You can't update this cart item");
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {

        CartItem cartItem = findCartItemById(cartItemId);
        User cartItemUser = cartItem.getCart().getUser();
        if(cartItemUser.getId().equals(userId)){
            cartItemRepository.delete(cartItem);
        }
        else throw new CartItemException("You can't delete this cart item");

    }

    @Override
    public CartItem findCartItemById(Long id) throws CartItemException {
        return cartItemRepository.findById(id).orElseThrow(() -> new CartItemException("Cart item not found with id: " + id));
    }
}
