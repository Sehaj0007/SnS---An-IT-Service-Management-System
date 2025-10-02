package com.itsm.itsm_backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// --- 1. THE ENUM IS NOW PUBLIC ---
// It needs to be public to be used by our new converter class.
enum AppointmentStatus {
    PENDING,
    CONFIRMED,
    COMPLETED,
    CANCELLED
}

// --- 2. THIS IS THE NEW CONVERTER CLASS (THE FIX) ---
// This class tells the server how to handle the data mismatch.
// It will automatically be used for all AppointmentStatus fields.
@Converter(autoApply = true)
class AppointmentStatusConverter implements AttributeConverter<AppointmentStatus, String> {

    @Override
    public String convertToDatabaseColumn(AppointmentStatus status) {
        // When saving to the database, always store it as uppercase (e.g., "PENDING")
        if (status == null) {
            return null;
        }
        return status.name();
    }

    @Override
    public AppointmentStatus convertToEntityAttribute(String dbData) {
        // When reading from the database, find the correct enum regardless of case (e.g., "Pending" will match PENDING)
        if (dbData == null) {
            return null;
        }
        return Stream.of(AppointmentStatus.values())
          .filter(c -> c.name().equalsIgnoreCase(dbData))
          .findFirst()
          .orElseThrow(IllegalArgumentException::new);
    }
}
// ---

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // Can be null if the booking is made by a guest
    private User user;

    @Column(nullable = false)
    private String clientName;

    @Column(nullable = false)
    private String clientEmail;

    private String clientPhone;

    @Column(nullable = false)
    private LocalDate preferredDate;

    @Column(nullable = false)
    private String preferredTime; // e.g., "Morning (9am-12pm)"

    @Column(columnDefinition = "TEXT")
    private String issueDescription;
    
    // --- 3. THE @Enumerated ANNOTATION IS NO LONGER NEEDED ---
    // The @Converter will handle everything automatically.
    @Column(nullable = false)
    private AppointmentStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) { // Added a null check for safety
            status = AppointmentStatus.PENDING; // Set default status on creation
        }
    }
}
