package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.api.keycloak.KeycloakUserService;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.exception.UserException;
import com.shoppit.ecommerce.service.UserService;
import com.shoppit.ecommerce.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private KeycloakUserService keycloakUserService;

    @Autowired
    private JwtUtil jwtUtil;

    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/users/profile")
    public ResponseEntity<User> getUserHandler(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('client_user')")
    @DeleteMapping("/users/delete-user")
    public ResponseEntity<?> deleteUserHandler(@RequestHeader("Authorization") String jwt) throws UserException {
        keycloakUserService.deleteUserById(jwtUtil.extractUserIdFromJwtString(jwt));
        return userService.deleteUserByJwt(jwt);
    }
}
