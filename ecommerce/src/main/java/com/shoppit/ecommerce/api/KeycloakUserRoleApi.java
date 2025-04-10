package com.shoppit.ecommerce.api;

import com.shoppit.ecommerce.api.keycloak.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
public class KeycloakUserRoleApi {

    @Autowired
    private RoleService roleService;

//    @PreAuthorize("hasRole('admin')")
    @PutMapping("/assign-role/user/{userId}")
    public ResponseEntity<?> assignRole(@PathVariable String userId, @RequestParam String roleName, @RequestParam boolean isClietRole) {

        roleService.assignRole(userId, roleName, isClietRole);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}


//package com.shoppit.ecommerce.api;
//
//import com.shoppit.ecommerce.api.keycloak.RoleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/roles")
//public class KeycloakRoleApi {
//
//    @Autowired
//    private RoleService roleService;
//
//    @PutMapping("/assign-role/user/{userId}")
//    public ResponseEntity<?> assignRole(
//            @PathVariable String userId,
//            @RequestParam String roleName,
//            @RequestParam boolean isClientRole) {
//
//        try {
//            roleService.assignRole(userId, roleName, isClientRole);
//            return ResponseEntity.ok().body("{\"message\": \"Role assigned successfully\"}");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("{\"error\": \"Failed to assign role: " + e.getMessage() + "\"}");
//        }
//    }
//}
