package com.itsm.itsm_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itsm.itsm_backend.dto.OrderDto;
import com.itsm.itsm_backend.entity.Appointment;
import com.itsm.itsm_backend.repository.AppointmentRepository;
import com.itsm.itsm_backend.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final OrderService orderService;
    private final AppointmentRepository appointmentRepository;

    @GetMapping("/orders")
    // THE FIX: Using hasAuthority is more explicit and reliable
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> allOrders = orderService.getAllOrders();
        return ResponseEntity.ok(allOrders);
    }

    @GetMapping("/appointments")
    // THE FIX: Using hasAuthority is more explicit and reliable
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> allAppointments = appointmentRepository.findAll();
        return ResponseEntity.ok(allAppointments);
    }
}

