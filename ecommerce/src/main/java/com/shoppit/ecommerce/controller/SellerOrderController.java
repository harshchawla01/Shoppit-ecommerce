package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.Seller;
import com.shoppit.ecommerce.entity.order.Order;
import com.shoppit.ecommerce.entity.order.OrderStatus;
import com.shoppit.ecommerce.exception.OrderException;
import com.shoppit.ecommerce.exception.SellerException;
import com.shoppit.ecommerce.service.OrderService;
import com.shoppit.ecommerce.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seller/orders")
public class SellerOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private SellerService sellerService;


    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersHandler(
            @RequestHeader("Authorization") String jwt
    ) throws SellerException {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Order> orders = orderService.sellersOrder(seller.getId());

        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{orderId}/status/{orderStatus}")
    public ResponseEntity<Order> updateOrderHandler(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId,
            @PathVariable OrderStatus orderStatus
    ) throws OrderException {

        Order orders = orderService.updateOrderStatus(orderId, orderStatus);

        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }
}