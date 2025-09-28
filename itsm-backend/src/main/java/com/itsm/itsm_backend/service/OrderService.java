package com.itsm.itsm_backend.service;

import com.itsm.itsm_backend.dto.OrderDto;
import com.itsm.itsm_backend.dto.OrderRequest;
import com.itsm.itsm_backend.entity.Component;
import com.itsm.itsm_backend.entity.OrderItem;
import com.itsm.itsm_backend.entity.PcOrder;
import com.itsm.itsm_backend.entity.User;
import com.itsm.itsm_backend.repository.ComponentRepository;
import com.itsm.itsm_backend.repository.PcOrderRepository;
import com.itsm.itsm_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final PcOrderRepository pcOrderRepository;
    private final ComponentRepository componentRepository;
    private final UserRepository userRepository;

    @Transactional
    public PcOrder createOrder(OrderRequest orderRequest, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        List<Component> components = componentRepository.findAllById(orderRequest.getComponentIds());

        if(components.size() != orderRequest.getComponentIds().size()) {
            throw new RuntimeException("One or more components not found");
        }

        BigDecimal totalPrice = components.stream()
                .map(Component::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        PcOrder order = new PcOrder();
        order.setUser(user);
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setOrderDate(LocalDateTime.now());
        order.setTotalPrice(totalPrice);
        order.setOrderStatus("PENDING_PAYMENT");

        List<OrderItem> orderItems = components.stream().map(component -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setPcOrder(order);
            orderItem.setComponent(component);
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        return pcOrderRepository.save(order);
    }

    // This is the method that was missing from your file
    public List<OrderDto> getOrdersForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found for order history"));

        List<PcOrder> orders = pcOrderRepository.findByUserOrderByOrderDateDesc(user);

        return orders.stream()
                .map(OrderDto::new)
                .collect(Collectors.toList());
    }
}

