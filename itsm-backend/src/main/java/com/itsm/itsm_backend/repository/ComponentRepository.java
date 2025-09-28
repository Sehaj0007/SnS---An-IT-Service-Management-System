package com.itsm.itsm_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itsm.itsm_backend.entity.Component;

/**
 * This is the Repository interface for our Component entity.
 * It provides all the standard database operations for components.
 */
@Repository
public interface ComponentRepository extends JpaRepository<Component, Integer> {
    // By extending JpaRepository, we get all the necessary methods
    // to find, save, and delete components without writing any code.
}