package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.exception.ProductException;
import com.shoppit.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) throws ProductException {

        Product product = productService.findProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProduct(@RequestParam(required = false) String query) {
        List<Product> products = productService.searchProducts(query);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minDiscount,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String stock,
            @RequestParam(defaultValue = "0") Integer pageNumber) {
//        System.out.println("color p "+pageNumber);
        return new ResponseEntity<>(
                productService.getAllProducts(category,brand,
                        color, size, minPrice,
                        maxPrice, sort,
                        stock, pageNumber, minDiscount), HttpStatus.OK);
    }
}

/*
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
 */
