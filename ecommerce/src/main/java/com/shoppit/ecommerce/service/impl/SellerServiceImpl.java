package com.shoppit.ecommerce.service.impl;

import com.shoppit.ecommerce.entity.AccountStatus;
import com.shoppit.ecommerce.entity.Address;
import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.entity.USER_ROLE;
import com.shoppit.ecommerce.exception.SellerException;
import com.shoppit.ecommerce.repository.AddressRepository;
import com.shoppit.ecommerce.repository.SellerRepository;
import com.shoppit.ecommerce.request.SignupRequest;
import com.shoppit.ecommerce.service.SellerService;
import com.shoppit.ecommerce.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Seller getSellerProfile(String jwt) throws SellerException {
        String username = jwtUtil.extractUsernameFromJwtString(jwt);
        return getSellerByUsername(username);
    }

    @Override
    public Seller createSeller(SignupRequest req) throws SellerException {
        Seller existingSeller = sellerRepository.findByUsername(req.getUsername());
        if(existingSeller!=null) {
            throw new SellerException("Seller already exists. Use different username");
        }
//        Address savedAddress = addressRepository.save(req.getPickupAddress());

        Seller newSeller = new Seller();
        newSeller.setEmail(req.getEmail());
        newSeller.setUsername(req.getUsername());
        newSeller.setFirstName(req.getFirstName());
        newSeller.setLastName(req.getLastName());
//        newSeller.setPickupAddress(savedAddress);
//        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setRole(USER_ROLE.client_seller);
//        newSeller.setMobile(seller.getMobile());
//        newSeller.setBankDetails(seller.getBankDetails());
//        newSeller.setBusinessDetails(seller.getBusinessDetails());

        return sellerRepository.save(newSeller);
    }

    @Override
    public Seller getSellerById(Long id) throws SellerException {
        return sellerRepository.findById(id).orElseThrow(() -> new SellerException("seller not found with id " + id));
    }

    @Override
    public Seller getSellerByUsername(String username) throws SellerException {
        Seller seller = sellerRepository.findByUsername(username);
        if(seller == null) {
            throw new SellerException("Seller not found");
        }
        return null;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return List.of();
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws SellerException {
        Seller existingSeller = this.getSellerById(id);
        if (seller.getUsername() != null) {
            existingSeller.setUsername(seller.getUsername());
        }
        if (seller.getMobile() != null) {
            existingSeller.setMobile(seller.getMobile());
        }
        if (seller.getEmail() != null) {
            existingSeller.setEmail(seller.getEmail());
        }

        if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessName() != null) {

            existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
        }

        if (seller.getBankDetails() != null && seller.getBankDetails().getAccountHolderName() != null && seller.getBankDetails().getIfscCode() != null && seller.getBankDetails().getAccountNumber() != null) {

            existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
            existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
            existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
        }
        if (seller.getPickupAddress() != null
                && seller.getPickupAddress().getAddress() != null
                && seller.getPickupAddress().getPhone() != null
                && seller.getPickupAddress().getCity() != null
                && seller.getPickupAddress().getState() != null
        ) {
            existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
            existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
            existingSeller.getPickupAddress().setPhone(seller.getPickupAddress().getPhone());
            existingSeller.getPickupAddress().setPostalCode(seller.getPickupAddress().getPostalCode());
        }
        if (seller.getGSTIN() != null) {
            existingSeller.setGSTIN(seller.getGSTIN());
        }
        return sellerRepository.save(existingSeller);
    }

    @Override
    public void deleteSeller(Long id) throws SellerException {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);
    }

//    @Override
//    public Seller verifyEmail(String email, String otp) throws Exception {
//        Seller seller = getSellerByEmail(email);
//        seller.setEmailVerified(true);
//        return sellerRepository.save(seller);
//    }

//    @Override
//    public Seller updateSellerAccountStatus(Long id, AccountStatus status) throws Exception {
//        Seller seller = getSellerById(id);
//        seller.setAccountStatus(status);
//        return sellerRepository.save(seller);
//    }
}

