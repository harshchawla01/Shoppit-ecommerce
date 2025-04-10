package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.api.keycloak.KeycloakUserService;
import com.shoppit.ecommerce.entity.AccountStatus;
import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.exception.SellerException;
import com.shoppit.ecommerce.request.SignupRequest;
import com.shoppit.ecommerce.service.AuthService;
import com.shoppit.ecommerce.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private SellerService sellerService;

//    @Autowired
//    private AuthService authService;

    @Autowired
    private KeycloakUserService keycloakUserService;

    @PreAuthorize("hasRole('client_admin')")
    @PostMapping("/createSeller")
    public ResponseEntity<?> createSeller(@RequestBody SignupRequest req) throws SellerException {

        keycloakUserService.createUser(req);
        return ResponseEntity.ok(sellerService.createSeller(req));
    }

    @PreAuthorize("hasRole('client_admin')")
    @GetMapping("/allSellers")
    public ResponseEntity<List<Seller>> getAllSellers()
//            @RequestParam(required = false) AccountStatus status)
    {
        List<Seller> sellers = sellerService.getAllSellers();
        return ResponseEntity.ok(sellers);
    }

    @PreAuthorize("hasRole('client_admin')")
    @DeleteMapping("/deleteSeller/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws SellerException {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
