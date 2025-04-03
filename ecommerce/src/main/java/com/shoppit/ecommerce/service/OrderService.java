package com.shoppit.ecommerce.service;

import com.shoppit.ecommerce.entity.Address;
import com.shoppit.ecommerce.entity.Cart;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.entity.order.Order;
import com.shoppit.ecommerce.entity.order.OrderItem;
import com.shoppit.ecommerce.entity.order.OrderStatus;
import com.shoppit.ecommerce.exception.OrderException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface OrderService {

    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart);

    public Order findOrderById(Long orderId) throws OrderException;

    public List<Order> userOrderHistory(Long userId);

    public List<Order> sellersOrder(Long sellerId);

    public Order cancelOrder(Long orderId, User user) throws OrderException;

    public Order updateOrderStatus(Long orderId, OrderStatus status) throws OrderException;

    OrderItem findByOrderItemId(Long orderItemId) throws OrderException;
}
