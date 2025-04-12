package com.shoppit.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@EqualsAndHashCode
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String firstName;
    private String lastName;
    private String mobile;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    // Flattened BusinessDetails fields
    private String businessName;
    private String businessEmail;
    private String businessPhone;
    private String businessAddress;
    private String logo;

    // Flattened BankDetails fields
    private String accountNumber;
    private String accountHolderName;
    private String ifscCode;

    @OneToOne(cascade = CascadeType.ALL)
    private Address pickupAddress = new Address();

    private String GSTIN;

    private USER_ROLE role = USER_ROLE.client_seller;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessEmail() {
        return businessEmail;
    }

    public void setBusinessEmail(String businessEmail) {
        this.businessEmail = businessEmail;
    }

    public String getBusinessPhone() {
        return businessPhone;
    }

    public void setBusinessPhone(String businessPhone) {
        this.businessPhone = businessPhone;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public Address getPickupAddress() {
        return pickupAddress;
    }

    public void setPickupAddress(Address pickupAddress) {
        this.pickupAddress = pickupAddress;
    }

    public String getGSTIN() {
        return GSTIN;
    }

    public void setGSTIN(String GSTIN) {
        this.GSTIN = GSTIN;
    }
}




//
//public class Seller {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    private String username;
//
//    private String firstName;
//    private String lastName;
//
//    private String mobile;
//
//    @Column(unique = true, nullable = false)
//    private String email;
//
//    private String password;
//
//    @Embedded
//    private BusinessDetails businessDetails = new BusinessDetails();
//
//    @Embedded
//    private BankDetails bankDetails = new BankDetails();
//
//    @OneToOne(cascade = CascadeType.ALL)
//    private Address pickupAddress = new Address();
//
//    private String GSTIN;
//
//    private USER_ROLE role = USER_ROLE.client_seller;
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getMobile() {
//        return mobile;
//    }
//
//    public void setMobile(String mobile) {
//        this.mobile = mobile;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public BusinessDetails getBusinessDetails() {
//        return businessDetails;
//    }
//
//    public void setBusinessDetails(BusinessDetails businessDetails) {
//        this.businessDetails = businessDetails;
//    }
//
//    public BankDetails getBankDetails() {
//        return bankDetails;
//    }
//
//    public void setBankDetails(BankDetails bankDetails) {
//        this.bankDetails = bankDetails;
//    }
//
//    public Address getPickupAddress() {
//        return pickupAddress;
//    }
//
//    public void setPickupAddress(Address pickupAddress) {
//        this.pickupAddress = pickupAddress;
//    }
//
//    public String getGSTIN() {
//        return GSTIN;
//    }
//
//    public void setGSTIN(String GSTIN) {
//        this.GSTIN = GSTIN;
//    }
//
//    public USER_ROLE getRole() {
//        return role;
//    }
//
//    public void setRole(USER_ROLE role) {
//        this.role = role;
//    }
//}
