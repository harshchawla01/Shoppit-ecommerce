//package com.shoppit.ecommerce.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.RequiredArgsConstructor;
//
//@Entity
//@Data
//@RequiredArgsConstructor
//public class SellerReport {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @OneToOne
//    private Seller seller;
//
//    private Long totalEarnings = 0L;
//    private Long totalSales = 0L;
//    private Long totalRefunds = 0L;
//    private Long totalTaxes = 0L;
//    private Long netEarnings = 0L;
//    private int totalOrders = 0;
//    private int cancelledOrders = 0;
//    private int totalTransactions = 0;
//}
