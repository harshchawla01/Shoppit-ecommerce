package com.shoppit.ecommerce.repository;

import com.shoppit.ecommerce.entity.HomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {

}
