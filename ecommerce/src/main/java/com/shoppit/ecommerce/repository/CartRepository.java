package com.shoppit.ecommerce.repository;

import com.shoppit.ecommerce.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
//    Cart findByUserId(Long userId);
    @Query("SELECT DISTINCT c FROM Cart c LEFT JOIN FETCH c.cartItems WHERE c.user.id = :userId")
    Cart findByUserId(@Param("userId") Long userId);
}
