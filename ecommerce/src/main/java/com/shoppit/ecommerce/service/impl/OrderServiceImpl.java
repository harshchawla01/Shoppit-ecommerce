package com.shoppit.ecommerce.service.impl;

import com.shoppit.ecommerce.entity.Address;
import com.shoppit.ecommerce.entity.Cart;
import com.shoppit.ecommerce.entity.CartItem;
import com.shoppit.ecommerce.entity.User;
import com.shoppit.ecommerce.entity.order.Order;
import com.shoppit.ecommerce.entity.order.OrderItem;
import com.shoppit.ecommerce.entity.order.OrderStatus;
//import com.shoppit.ecommerce.entity.order.PaymentStatus;
import com.shoppit.ecommerce.exception.OrderException;
import com.shoppit.ecommerce.repository.AddressRepository;
import com.shoppit.ecommerce.repository.OrderItemRepository;
import com.shoppit.ecommerce.repository.OrderRepository;
import com.shoppit.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
        if(!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }
        Address address = addressRepository.save(shippingAddress);

        // We need to make different orders for all sellers
        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

        Set<Order> orders = new HashSet<>();
        // distributing cart items by seller ids for separate orders for all sellers
        for(Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()) {
            Long sellerId = entry.getKey();
            List<CartItem> cartItems = entry.getValue();

//          Total of items per List
            int totalOrderPrice = cartItems.stream().mapToInt(
                    CartItem::getSellingPrice
            ).sum();

            int totalMrpPrice = cartItems.stream().mapToInt(
                    CartItem::getMrpPrice
            ).sum();

//          Total items per List
            int totalItems = cartItems.stream().mapToInt(CartItem::getQuantity).sum();

            Order createOrder = new Order();
            createOrder.setUser(user);
            createOrder.setSellerId(sellerId);
            createOrder.setTotalMrpPrice(totalMrpPrice);
            createOrder.setTotalSellingPrice(totalOrderPrice);
            createOrder.setNumberOfItems(totalItems);
            createOrder.setShippingAddress(address);
            createOrder.setOrderStatus(OrderStatus.PENDING);
//            createOrder.getPaymentDetails().setPaymentStatus(PaymentStatus.PENDING);

            Order savedOrder = orderRepository.save(createOrder);
            orders.add(savedOrder);

            List<OrderItem> orderItems = new ArrayList<>();
            for(CartItem cartItem : cartItems) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setMrpPrice(cartItem.getMrpPrice());
                orderItem.setSellingPrice(cartItem.getSellingPrice());
                orderItem.setProduct(cartItem.getProduct());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setSize(cartItem.getSize());
                orderItem.setUserId(user.getId());

                savedOrder.getOrderItems().add(orderItem);
                OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            }
        }
        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        return orderRepository.findById(orderId).orElseThrow(() -> new OrderException("Order not found"));
    }

    @Override
    public List<Order> userOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> sellersOrder(Long sellerId) {
        return orderRepository.findBySellerIdOrderByOrderDateDesc(sellerId);
    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws OrderException {
        Order order = findOrderById(orderId);
        if(!user.getId().equals(order.getUser().getId())) {
            throw new OrderException("You are not authorized to this order");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus status) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }

    @Override
    public OrderItem findByOrderItemId(Long orderItemId) throws OrderException {
        return orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new OrderException("Order item does not exist"));
    }
}
