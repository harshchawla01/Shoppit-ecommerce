package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.service.SellerService;
import com.shoppit.ecommerce.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SellerController {

    @Autowired
    private SellerService sellerService;
    @Autowired
    private JwtUtil jwtUtil;


//    @PostMapping("/sent/login-top")
//    public ResponseEntity<ApiResponse> sentLoginOtp(@RequestBody VerificationCode req) throws MessagingException, SellerException {
//        Seller seller = sellerService.getSellerByEmail(req.getEmail());
//
//        String otp = OtpUtils.generateOTP();
//        VerificationCode verificationCode = verificationService.createVerificationCode(otp, req.getEmail());
//
//        String subject = "Zosh Bazaar Login Otp";
//        String text = "your login otp is - ";
//        emailService.sendVerificationOtpEmail(req.getEmail(), verificationCode.getOtp(), subject, text);
//
//        ApiResponse res = new ApiResponse();
//        res.setMessage("otp sent");
//        return new ResponseEntity<>(res, HttpStatus.CREATED);
//    }
//
//    @PostMapping("/verify/login-top")
//    public ResponseEntity<AuthResponse> verifyLoginOtp(@RequestBody VerificationCode req) throws MessagingException, SellerException {
////        Seller savedSeller = sellerService.createSeller(seller);
//
//
//        String otp = req.getOtp();
//        String email = req.getEmail();
//        VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);
//
//        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
//            throw new SellerException("wrong otp...");
//        }
//
//        Authentication authentication = authenticate(req.getEmail());
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = jwtUtil.generateToken(authentication);
//        AuthResponse authResponse = new AuthResponse();
//
//        authResponse.setMessage("Login Success");
//        authResponse.setJwt(token);
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//
//
//        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
//
//
//        authResponse.setRole(USER_ROLE.valueOf(roleName));
//
//        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
//    }
//
//    private Authentication authenticate(String username) {
//        UserDetails userDetails = customeUserServiceImplementation.loadUserByUsername("seller_" + username);
//
//        System.out.println("sign in userDetails - " + userDetails);
//
//        if (userDetails == null) {
//            System.out.println("sign in userDetails - null " + userDetails);
//            throw new BadCredentialsException("Invalid username or password");
//        }
//
//        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//    }
//
//    @PatchMapping("/verify/{otp}")
//    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws SellerException {
//
//
//        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);
//
//        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
//            throw new SellerException("wrong otp...");
//        }
//
//        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);
//
//        return new ResponseEntity<>(seller, HttpStatus.OK);
//    }
//
//
//    @PostMapping
//    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws SellerException, MessagingException {
//        Seller savedSeller = sellerService.createSeller(seller);
//
//        String otp = OtpUtils.generateOTP();
//        VerificationCode verificationCode = verificationService.createVerificationCode(otp, seller.getEmail());
//
//        String subject = "Zosh Bazaar Email Verification Code";
//        String text = "Welcome to Zosh Bazaar, verify your account using this link ";
//        String frontend_url = "http://localhost:3000/verify-seller/";
//        emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject, text + frontend_url);
//        return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws Exception {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(
            @RequestHeader("Authorization") String jwt) throws Exception {
        String username = jwtUtil.extractUsernameFromJwtString(jwt);
        Seller seller = sellerService.getSellerByUsername(username);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @PatchMapping()
    public ResponseEntity<Seller> updateSeller(
            @RequestHeader("Authorization") String jwt, @RequestBody Seller seller) throws Exception {

        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception {

        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();


    }
}