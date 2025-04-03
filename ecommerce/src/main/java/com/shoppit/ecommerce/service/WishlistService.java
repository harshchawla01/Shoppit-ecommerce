package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.entity.Wishlist;
import com.shoppit.ecommerce.exception.WishlistNotFoundException;

public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishListByUser(User user);
    Wishlist addProductToWishlist(User user, Product product) throws WishlistNotFoundException;
}
