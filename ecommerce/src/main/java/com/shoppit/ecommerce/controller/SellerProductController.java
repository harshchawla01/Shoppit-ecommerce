package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.Product;
import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.exception.ProductException;
import com.shoppit.ecommerce.exception.SellerException;
import com.shoppit.ecommerce.exception.UserException;
import com.shoppit.ecommerce.request.CreateProductRequest;
import com.shoppit.ecommerce.service.ProductService;
import com.shoppit.ecommerce.service.SellerService;
import com.shoppit.ecommerce.service.UserService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers")
public class SellerProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private SellerService sellerService;


    @PreAuthorize("hasRole('client_seller')")
    @GetMapping("/product")
    public ResponseEntity<List<Product>> getProductBySellerId(
            @RequestHeader("Authorization") String jwt) throws ProductException, SellerException {

        Seller seller=sellerService.getSellerProfile(jwt);

        List<Product> products = productService.getProductBySellerId(seller.getId());
        return new ResponseEntity<>(products, HttpStatus.OK);

    }

    @PreAuthorize("hasRole('client_seller')")
    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(
            @RequestBody CreateProductRequest request,

            @RequestHeader("Authorization")String jwt)
            throws UserException, ProductException, SellerException
    {

        Seller seller=sellerService.getSellerProfile(jwt);

        Product product = productService.createProduct(request, seller);
        return new ResponseEntity<>(product, HttpStatus.CREATED);

    }

    @PreAuthorize("hasRole('client_seller')")
    @DeleteMapping("/product/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ProductException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('client_seller')")
    @PatchMapping("/product/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product) throws ProductException {
            Product updatedProduct = productService.updateProduct(productId, product);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}
