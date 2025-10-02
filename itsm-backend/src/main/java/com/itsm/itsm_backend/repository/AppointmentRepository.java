package com.itsm.itsm_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itsm.itsm_backend.entity.Appointment;

/**
 * Repository interface for Appointment entity.
 * JpaRepository provides all the basic CRUD operations (Create, Read, Update, Delete).
 */
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Spring Data JPA will automatically provide implementations for standard methods.
    // We can add custom query methods here if needed in the future, for example:
    // List<Appointment> findByUser(User user);
}