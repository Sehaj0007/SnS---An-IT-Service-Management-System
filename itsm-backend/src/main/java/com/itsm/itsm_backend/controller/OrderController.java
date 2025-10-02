package com.itsm.itsm_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itsm.itsm_backend.dto.OrderDto;
import com.itsm.itsm_backend.dto.OrderRequest;
import com.itsm.itsm_backend.entity.PcOrder;
import com.itsm.itsm_backend.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<PcOrder> createOrder(@RequestBody OrderRequest orderRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        PcOrder newOrder = orderService.createOrder(orderRequest, userEmail);
        return ResponseEntity.ok(newOrder);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDto>> getMyOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        List<OrderDto> orders = orderService.getOrdersForUser(userEmail);
        return ResponseEntity.ok(orders);
    }
}

