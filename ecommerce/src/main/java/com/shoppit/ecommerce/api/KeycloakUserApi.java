package com.shoppit.ecommerce.api;

import com.shoppit.ecommerce.request.SignupRequest;
import com.shoppit.ecommerce.api.keycloak.KeycloakUserService;
import lombok.AllArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.ws.rs.core.Response;

import java.security.Principal;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class KeycloakUserApi {

    @Autowired
    private KeycloakUserService keycloakUserService;

//    @PostMapping("/create")
//    public ResponseEntity<?> createUser(@RequestBody SignupRequest req) {
//        keycloakUserService.createUser(req);
//        return ResponseEntity.ok().build();
//    }

    @GetMapping
    public UserRepresentation getUser(Principal principal) {
        return keycloakUserService.getUserById(principal.getName());
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId) {
        keycloakUserService.deleteUserById(userId);
    }
}
