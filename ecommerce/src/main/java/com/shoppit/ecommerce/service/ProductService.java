package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.exception.ProductException;
import com.shoppit.ecommerce.request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest req, Seller seller);
    public void deleteProduct(Long productId) throws ProductException;
    public Product updateProduct(Long productId, Product product) throws ProductException;
    public Product findProductById(Long productId) throws ProductException;
    List<Product> searchProducts(String query);
    public Page<Product> getAllProducts(
            String category,
            String brand,
            String colors,
            String sizes,
            Integer minimumPrice,
            Integer maximumPrice,

            String sort,
            String stock,
            Integer pageNumber,
            Integer minDiscount
    );
    List<Product> getProductBySellerId(Long sellerId); // For seller dashboard
}
