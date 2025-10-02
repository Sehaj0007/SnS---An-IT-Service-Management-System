package com.itsm.itsm_backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private LocalDate preferredDate;
    private String preferredTime;
    private String issueDescription;
    // We don't need userId here, as we'll handle that separately
    // for logged-in users if we enhance this feature later.
}