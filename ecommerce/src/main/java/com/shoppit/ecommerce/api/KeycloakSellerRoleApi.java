package com.shoppit.ecommerce.api;

import com.shoppit.ecommerce.api.keycloak.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
public class KeycloakSellerRoleApi {

    @Autowired
    private RoleService roleService;

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/assign-role/seller/{userId}")
    public ResponseEntity<?> assignRole(@PathVariable String userId, @RequestParam String roleName, @RequestParam boolean isClietRole) {

        roleService.assignRole(userId, roleName, isClietRole);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}