package com.itsm.itsm_backend.controller;

import com.itsm.itsm_backend.dto.OrderDto;
import com.itsm.itsm_backend.entity.Appointment;
import com.itsm.itsm_backend.repository.AppointmentRepository;
import com.itsm.itsm_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin") // All endpoints here will start with /api/admin
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final OrderService orderService;
    private final AppointmentRepository appointmentRepository;

    // This annotation is the security rule. It ensures only users with the ADMIN role can access this.
    @GetMapping("/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> allOrders = orderService.getAllOrders();
        return ResponseEntity.ok(allOrders);
    }

    // This endpoint is also protected and for admins only.
    @GetMapping("/appointments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> allAppointments = appointmentRepository.findAll();
        return ResponseEntity.ok(allAppointments);
    }
}

