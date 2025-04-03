package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.request.SignupRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    String createUser(SignupRequest req);
//    String createSeller(SignupRequest req);
}
