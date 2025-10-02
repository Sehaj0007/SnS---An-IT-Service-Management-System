package com.itsm.itsm_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.itsm.itsm_backend.entity.PcOrder;

import lombok.Data;

@Data
public class OrderDto {
    private Long orderId;
    private LocalDateTime orderDate;
    private String orderStatus;
    private BigDecimal totalPrice;
    private List<OrderItemDto> items;
    private String userEmail; // <-- 1. ADD THIS NEW FIELD

    public OrderDto(PcOrder order) {
        this.orderId = order.getOrderId();
        this.orderDate = order.getOrderDate();
        this.orderStatus = order.getOrderStatus();
        this.totalPrice = order.getTotalPrice();
        this.items = order.getOrderItems().stream()
                .map(OrderItemDto::new)
                .collect(Collectors.toList());
        this.userEmail = order.getUser().getEmail(); // <-- 2. SET THE NEW FIELD
    }
}

