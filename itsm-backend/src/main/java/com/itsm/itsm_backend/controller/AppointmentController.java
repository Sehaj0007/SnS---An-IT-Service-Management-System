package com.itsm.itsm_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itsm.itsm_backend.dto.AppointmentRequest;
import com.itsm.itsm_backend.entity.Appointment;
import com.itsm.itsm_backend.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from our React frontend
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequest request) {
        Appointment newAppointment = appointmentService.createAppointment(request);
        // We return ResponseEntity.ok() to send a 200 OK status with the created appointment data.
        return ResponseEntity.ok(newAppointment);
    }
}
