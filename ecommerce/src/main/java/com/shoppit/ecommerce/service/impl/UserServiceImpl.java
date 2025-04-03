package com.shoppit.ecommerce.service.impl;

import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.exception.UserException;
import com.shoppit.ecommerce.repository.UserRepository;
import com.shoppit.ecommerce.service.UserService;
import com.shoppit.ecommerce.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

//    @Override
//    public User findUserByJwtToken(String jwt) throws UserException {
//        // Parse the JWT string to a Jwt object
//        Jwt jwtObject = jwtUtil.parseJwt(jwt);
//
//        // Use the converter to get the username (principal claim)
//        String username = jwtAuthConverter.getPrincipalClaimName(jwtObject);
//
//        // Find user by username instead of email
//        return findUserByUsername(username);
//    }
//
//    // Add this new method
//    public User findUserByUsername(String username) throws UserException {
//        User user = userRepository.findByUsername(username);
//        if(user == null) {
//            throw new UserException("User not found with username: " + username);
//        }
//        return user;
//    }

    @Override
    public User findUserByJwtToken(String jwt) throws UserException {
        String username = jwtUtil.extractUsernameFromJwtString(jwt);
        return this.findUserByUsername(username);
    }

//    @Override
//    public User findUserByJwtToken(String jwt) throws UserException {
//        String email = jwtUtil.extractEmailFromJwtString(jwt);
//        return this.findUserByEmail(email);
//    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        User user = userRepository.findUserByUsername(username);
        if(user == null) {
            throw new UserException("user not found with username: " + username);
        }
        return user;
    }

    @Override
    public ResponseEntity<?> deleteUserByJwt(String jwt) throws UserException {
        User user = this.findUserByJwtToken(jwt);
        userRepository.delete(user);
        return ResponseEntity.noContent().build();
    }
}
