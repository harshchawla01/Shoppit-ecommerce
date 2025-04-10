package com.shoppit.ecommerce.repository;

import com.shoppit.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    // Find products by category ID
//    List<Product> findByCategoryId(String categoryId);

    // Find products by seller ID
    List<Product> findBySellerId(Long sellerId);

//    List<Product> searchProduct(@Param("query") String query);

    @Query("select p from Product p where (:query is null or lower(p.title) " +
            "like lower(concat('%', :query, '%'))) " +
            "or (:query is null or lower(p.category.name) " +
            "like lower(concat('%', :query, '%')))")
    List<Product> searchProduct(@Param("query") String query);



    // Custom search query with multiple optional parameters
//    @Query("SELECT p FROM Product p WHERE " +
//            "(:title IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
//            "(:color IS NULL OR p.color = :color) AND " +
//            "(:minPrice IS NULL OR p.sellingPrice >= :minPrice) AND " +
//            "(:maxPrice IS NULL OR p.sellingPrice <= :maxPrice)")
//    List<Product> findBySearchCriteria(
//            @Param("title") String title,
//            @Param("color") String color,
//            @Param("minPrice") Integer minPrice,
//            @Param("maxPrice") Integer maxPrice
//    );

//     Find top discounted products
//    List<Product> findTop10ByOrderByDiscountPercentDesc();
//
//    // Find products with low stock
//    List<Product> findByQuantityLessThan(int threshold);
}