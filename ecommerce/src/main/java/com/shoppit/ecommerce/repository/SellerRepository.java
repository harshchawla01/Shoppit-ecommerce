package com.shoppit.ecommerce.repository;

import com.shoppit.ecommerce.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByUsername(String username);

//    List<Seller> findByAccountStatus(AccountStatus accountStatus);
}
