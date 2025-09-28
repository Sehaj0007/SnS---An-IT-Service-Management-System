package com.itsm.itsm_backend.controller;

import com.itsm.itsm_backend.dto.AppointmentRequest;
import com.itsm.itsm_backend.entity.Appointment;
import com.itsm.itsm_backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
