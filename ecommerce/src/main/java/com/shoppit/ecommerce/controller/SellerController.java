package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.service.SellerService;
import com.shoppit.ecommerce.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
public class SellerController {

    @Autowired
    private SellerService sellerService;
    @Autowired
    private JwtUtil jwtUtil;

    @PreAuthorize("hasRole('client_seller')")
    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws Exception {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('client_seller')")
    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(
            @RequestHeader("Authorization") String jwt) throws Exception {
        String username = jwtUtil.extractUsernameFromJwtString(jwt);
        Seller seller = sellerService.getSellerByUsername(username);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('client_seller')")
    @PatchMapping()
    public ResponseEntity<Seller> updateSeller(
            @RequestHeader("Authorization") String jwt, @RequestBody Seller seller) throws Exception {

        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile, seller);
        return ResponseEntity.ok(updatedSeller);
    }

    @PreAuthorize("hasRole('client_seller')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception {

        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}