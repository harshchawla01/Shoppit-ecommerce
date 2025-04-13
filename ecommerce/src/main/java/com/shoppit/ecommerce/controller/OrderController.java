package com.shoppit.ecommerce.controller;

import com.shoppit.ecommerce.entity.*;
import com.shoppit.ecommerce.entity.Order;
import com.shoppit.ecommerce.entity.OrderItem;
import com.shoppit.ecommerce.exception.OrderException;
import com.shoppit.ecommerce.exception.SellerException;
import com.shoppit.ecommerce.exception.UserException;
import com.shoppit.ecommerce.service.CartService;
import com.shoppit.ecommerce.service.OrderService;
import com.shoppit.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;

    @PreAuthorize("hasRole('client_user')")
    @PostMapping()
    public ResponseEntity<?> createOrderHandler(
            @RequestBody Address shippingAddress,
//            @RequestParam PaymentMethod paymentMethod,
            @RequestHeader("Authorization") String jwt)
            throws UserException {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);
        Set<Order> orders = orderService.createOrder(user, shippingAddress, cart); // orders for different sellers

        return new ResponseEntity<>("Order placed with pending state", HttpStatus.OK);

    }

    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistoryHandler(
            @RequestHeader("Authorization")
            String jwt) throws UserException {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.userOrderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId, @RequestHeader("Authorization")
    String jwt) throws OrderException, UserException {

        User user = userService.findUserByJwtToken(jwt);
        Order orders = orderService.findOrderById(orderId);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/item/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItemById(
            @PathVariable Long orderItemId, @RequestHeader("Authorization")
            String jwt) throws Exception {
//        System.out.println("------- controller ");
        User user = userService.findUserByJwtToken(jwt);
        OrderItem orderItem = orderService.findByOrderItemId(orderItemId);
        return new ResponseEntity<>(orderItem, HttpStatus.ACCEPTED);
    }

    @PreAuthorize("hasRole('client_user')")
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, OrderException, SellerException {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.cancelOrder(orderId, user);

//        Seller seller = sellerService.getSellerById(order.getSellerId());
//        SellerReport report=sellerReportService.getSellerReport(seller);

//        report.setCanceledOrders(report.getCanceledOrders()+1);
//        report.setTotalRefunds(report.getTotalRefunds()+order.getTotalSellingPrice());
//        sellerReportService.updateSellerReport(report);

        return ResponseEntity.ok(order);
    }
}