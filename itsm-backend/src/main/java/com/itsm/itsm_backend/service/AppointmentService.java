package com.itsm.itsm_backend.service;

import com.itsm.itsm_backend.dto.AppointmentRequest;
import com.itsm.itsm_backend.entity.Appointment;
import com.itsm.itsm_backend.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Transactional
    public Appointment createAppointment(AppointmentRequest request) {
        // Here you could add validation logic, check for user existence if they are logged in, etc.
        Appointment appointment = new Appointment();
        appointment.setClientName(request.getClientName());
        appointment.setClientEmail(request.getClientEmail());
        appointment.setClientPhone(request.getClientPhone());
        appointment.setPreferredDate(request.getPreferredDate());
        appointment.setPreferredTime(request.getPreferredTime());
        appointment.setIssueDescription(request.getIssueDescription());
        
        // The @PrePersist annotation in the Appointment entity will handle
        // setting the createdAt and default status fields.

        return appointmentRepository.save(appointment);
    }
}