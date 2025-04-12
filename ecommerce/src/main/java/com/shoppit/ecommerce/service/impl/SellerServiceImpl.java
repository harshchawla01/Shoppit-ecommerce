package com.shoppit.ecommerce.service.impl;

import com.shoppit.ecommerce.entity.*;
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
//        newSeller.setRole(USER_ROLE.client_seller);
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
        return seller;
    }

    @Override
    public List<Seller> getAllSellers() {
//        return List.of();
        return sellerRepository.findAll();
    }


//    @Override
//    public Seller updateSeller(Long id, Seller seller) throws SellerException {
//        Seller existingSeller = this.getSellerById(id);
//        if (seller.getMobile() != null) {
//            existingSeller.setMobile(seller.getMobile());
//        }
//
//        if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessName() != null) {
//
//            existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
//        }
//
//        if (seller.getBankDetails() != null && seller.getBankDetails().getAccountHolderName() != null && seller.getBankDetails().getIfscCode() != null && seller.getBankDetails().getAccountNumber() != null) {
//
//            existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
//            existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
//            existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
//        }
//        if (seller.getPickupAddress() != null
//                && seller.getPickupAddress().getAddress() != null
//                && seller.getPickupAddress().getPhone() != null
//                && seller.getPickupAddress().getCity() != null
//                && seller.getPickupAddress().getState() != null
//        ) {
//            existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
//            existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
//            existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
//            existingSeller.getPickupAddress().setPhone(seller.getPickupAddress().getPhone());
//            existingSeller.getPickupAddress().setPostalCode(seller.getPickupAddress().getPostalCode());
//        }
//        if (seller.getGSTIN() != null) {
//            existingSeller.setGSTIN(seller.getGSTIN());
//        }
//        return sellerRepository.save(existingSeller);
//    }

//    @Override
//    public Seller updateSeller(Seller existingSeller, Seller seller) throws SellerException {
////        Seller existingSeller = this.getSellerById(id);
//
//        if (seller.getMobile() != null) {
//            existingSeller.setMobile(seller.getMobile());
//        }
//
//        if (seller.getGSTIN() != null) {
//            existingSeller.setGSTIN(seller.getGSTIN());
//        }
//
//        if (seller.getBusinessDetails() != null) {
//            BusinessDetails newBiz = seller.getBusinessDetails();
//            BusinessDetails existingBiz = existingSeller.getBusinessDetails();
//
//            if(existingBiz==null) {
//                existingBiz = new BusinessDetails();
//                existingSeller.setBusinessDetails(existingBiz);
//            }
//            if (newBiz.getBusinessName() != null)
//                existingBiz.setBusinessName(newBiz.getBusinessName());
//
//            if (newBiz.getBusinessEmail() != null)
//                existingBiz.setBusinessEmail(newBiz.getBusinessEmail());
//
//            if (newBiz.getBusinessPhone() != null)
//                existingBiz.setBusinessPhone(newBiz.getBusinessPhone());
//
//            if (newBiz.getBusinessAddress() != null)
//                existingBiz.setBusinessAddress(newBiz.getBusinessAddress());
//
//            if (newBiz.getLogo() != null)
//                existingBiz.setLogo(newBiz.getLogo());
//        }
//
//        if (seller.getBankDetails() != null) {
//            BankDetails newBank = seller.getBankDetails();
//            BankDetails existingBank = existingSeller.getBankDetails();
//
//            if(existingBank==null) {
//                existingBank = new BankDetails();
//                existingSeller.setBankDetails(existingBank);
//            }
//
//            if (newBank.getAccountHolderName() != null)
//                existingBank.setAccountHolderName(newBank.getAccountHolderName());
//
//            if (newBank.getAccountNumber() != null)
//                existingBank.setAccountNumber(newBank.getAccountNumber());
//
//            if (newBank.getIfscCode() != null)
//                existingBank.setIfscCode(newBank.getIfscCode());
//        }
//
//        if (seller.getPickupAddress() != null) {
//            Address newAddress = seller.getPickupAddress();
//            Address existingAddress = existingSeller.getPickupAddress();
//
//            if(existingAddress==null) {
//                existingAddress = new Address();
//                existingSeller.setPickupAddress(existingAddress);
//            }
//
//            if (newAddress.getName() != null)
//                existingAddress.setName(newAddress.getName());
//
//            if (newAddress.getLocality() != null)
//                existingAddress.setLocality(newAddress.getLocality());
//
//            if (newAddress.getAddress() != null)
//                existingAddress.setAddress(newAddress.getAddress());
//
//            if (newAddress.getCity() != null)
//                existingAddress.setCity(newAddress.getCity());
//
//            if (newAddress.getState() != null)
//                existingAddress.setState(newAddress.getState());
//
//            if (newAddress.getPostalCode() != null)
//                existingAddress.setPostalCode(newAddress.getPostalCode());
//
//            if (newAddress.getPhone() != null)
//                existingAddress.setPhone(newAddress.getPhone());
//        }
//
//        return sellerRepository.save(existingSeller);
//    }

@Override
public Seller updateSeller(Seller existingSeller, Seller seller) throws SellerException {
    if (seller.getMobile() != null) {
        existingSeller.setMobile(seller.getMobile());
    }

    if (seller.getGSTIN() != null) {
        existingSeller.setGSTIN(seller.getGSTIN());
    }

    // Update flattened BusinessDetails fields
    if (seller.getBusinessName() != null) {
        existingSeller.setBusinessName(seller.getBusinessName());
    }
    if (seller.getBusinessEmail() != null) {
        existingSeller.setBusinessEmail(seller.getBusinessEmail());
    }
    if (seller.getBusinessPhone() != null) {
        existingSeller.setBusinessPhone(seller.getBusinessPhone());
    }
    if (seller.getBusinessAddress() != null) {
        existingSeller.setBusinessAddress(seller.getBusinessAddress());
    }
    if (seller.getLogo() != null) {
        existingSeller.setLogo(seller.getLogo());
    }

    // Update flattened BankDetails fields
    if (seller.getAccountHolderName() != null) {
        existingSeller.setAccountHolderName(seller.getAccountHolderName());
    }
    if (seller.getAccountNumber() != null) {
        existingSeller.setAccountNumber(seller.getAccountNumber());
    }
    if (seller.getIfscCode() != null) {
        existingSeller.setIfscCode(seller.getIfscCode());
    }

    // Update Address (keeping this structure the same)
    if (seller.getPickupAddress() != null) {
        Address newAddress = seller.getPickupAddress();
        Address existingAddress = existingSeller.getPickupAddress();

        if (existingAddress == null) {
            existingAddress = new Address();
            existingSeller.setPickupAddress(existingAddress);
        }

        if (newAddress.getName() != null)
            existingAddress.setName(newAddress.getName());

        if (newAddress.getLocality() != null)
            existingAddress.setLocality(newAddress.getLocality());

        if (newAddress.getAddress() != null)
            existingAddress.setAddress(newAddress.getAddress());

        if (newAddress.getCity() != null)
            existingAddress.setCity(newAddress.getCity());

        if (newAddress.getState() != null)
            existingAddress.setState(newAddress.getState());

        if (newAddress.getPostalCode() != null)
            existingAddress.setPostalCode(newAddress.getPostalCode());

        if (newAddress.getPhone() != null)
            existingAddress.setPhone(newAddress.getPhone());
    }

    return sellerRepository.save(existingSeller);
}


    @Override
    public void deleteSeller(Long id) throws SellerException {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);
    }

//    @Override
//    public Seller updateSellerAccountStatus(Long id, AccountStatus status) throws Exception {
//        Seller seller = getSellerById(id);
//        seller.setAccountStatus(status);
//        return sellerRepository.save(seller);
//    }
}

