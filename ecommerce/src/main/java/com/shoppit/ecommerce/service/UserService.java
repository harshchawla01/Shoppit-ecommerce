package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.exception.UserException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public User findUserByJwtToken(String jwt) throws UserException;

    public User findUserByUsername(String username) throws UserException;

    public ResponseEntity<?> deleteUserByJwt(String jwt) throws UserException;
}
