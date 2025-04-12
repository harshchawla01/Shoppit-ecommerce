package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.entity.Wishlist;
import com.shoppit.ecommerce.service.ProductService;
import com.shoppit.ecommerce.service.UserService;
import com.shoppit.ecommerce.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

    @Autowired
    private WishlistService wishlistService;

    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;

    @PreAuthorize("hasRole('client_user')")
    @GetMapping
    public ResponseEntity<Wishlist> getWishlistsByUser(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Wishlist wishlist = wishlistService.getWishListByUser(user);
        return ResponseEntity.ok(wishlist);
    }

    @PreAuthorize("hasRole('client_user')")
    @PostMapping("/add-product/{productId}")
    public ResponseEntity<Wishlist> addProductToWishlist(@RequestHeader("Authorization") String jwt, @PathVariable("productId") Long productId) throws Exception {
        Product product = productService.findProductById(productId);
        User user = userService.findUserByJwtToken(jwt);
        Wishlist updatedWishlist = wishlistService.addProductToWishlist(user, product);
        return ResponseEntity.ok(updatedWishlist);
    }
}
