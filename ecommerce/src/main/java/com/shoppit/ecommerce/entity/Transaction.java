//package com.shoppit.ecommerce.entity;
//
//
//import com.shoppit.ecommerce.entity.order.Order;
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.EqualsAndHashCode;
//import lombok.RequiredArgsConstructor;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Data
//@RequiredArgsConstructor
//@EqualsAndHashCode
//public class Transaction {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @ManyToOne
//    private User customer;
//
//    @OneToOne
//    private Order order;
//
//    @ManyToOne
//    private Seller seller;
//
//    private LocalDateTime date = LocalDateTime.now();
//}
