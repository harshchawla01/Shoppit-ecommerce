package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.exception.UserException;
import com.shoppit.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users/profile")
    public ResponseEntity<User> createUserHandler(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/delete-user")
    public ResponseEntity<?> deleteUserHandler(@RequestHeader("Authorization") String jwt) throws UserException {
        return userService.deleteUserByJwt(jwt);
    }
}
