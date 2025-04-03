package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.entity.AccountStatus;
import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.exception.SellerException;
import com.shoppit.ecommerce.request.SignupRequest;

import java.util.List;

public interface SellerService {
    Seller getSellerProfile(String jwt) throws SellerException;
    Seller createSeller(SignupRequest req) throws SellerException;
    Seller getSellerById(Long id) throws SellerException;
    Seller getSellerByUsername(String email) throws SellerException;
    List<Seller> getAllSellers(AccountStatus status);
    Seller updateSeller(Long id, Seller seller) throws SellerException;
    void deleteSeller(Long id) throws SellerException;
//    Seller verifyEmail(String email, String otp) throws Exception;
//    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception;
}
