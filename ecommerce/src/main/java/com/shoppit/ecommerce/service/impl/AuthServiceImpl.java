package com.shoppit.ecommerce.service.impl;

import com.shoppit.ecommerce.entity.Cart;
import com.shoppit.ecommerce.entity.USER_ROLE;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.repository.CartRepository;
import com.shoppit.ecommerce.repository.UserRepository;
import com.shoppit.ecommerce.request.SignupRequest;
import com.shoppit.ecommerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public String  createUser(SignupRequest req) {
        User existingUser = userRepository.findUserByUsername(req.getUsername());
        if (existingUser != null) {
            throw new RuntimeException("User with this username already exists");
        }

        User createdUser = new User();
        createdUser.setUsername(req.getUsername());
        createdUser.setEmail(req.getEmail());
        createdUser.setFirstName(req.getFirstName());
        createdUser.setLastName(req.getLastName());
        createdUser.setRole(USER_ROLE.client_user);
//        createdUser.setPhone("1234567890");
//        createdUser.setPassword(req.getPassword());

        User savedUser = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);

        return "User created successfully with ID: " + savedUser.getId();
    }
}
