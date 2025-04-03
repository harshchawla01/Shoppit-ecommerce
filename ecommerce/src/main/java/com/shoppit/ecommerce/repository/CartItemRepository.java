package com.shoppit.ecommerce.repository;

import com.shoppit.ecommerce.entity.Cart;
import com.shoppit.ecommerce.entity.CartItem;
import com.shoppit.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
