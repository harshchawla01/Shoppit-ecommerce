package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.request.SignupRequest;
import com.shoppit.ecommerce.service.AuthService;
import com.shoppit.ecommerce.api.keycloak.KeycloakUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private KeycloakUserService keycloakUserService;

    @PostMapping("/signup")
    public ResponseEntity<String> createUserHandler(@RequestBody SignupRequest req) {

        authService.createUser(req);

        return keycloakUserService.createUser(req); // Itself a response entity, return keycloak's user id
    }
}
