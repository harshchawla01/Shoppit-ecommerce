package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.entity.Cart;
import com.shoppit.ecommerce.entity.CartItem;
import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.entity.User;

public interface CartService {
    public CartItem addCartItem(User user, Product product, String size, int quantity);
    public Cart findUserCart(User user);
}
