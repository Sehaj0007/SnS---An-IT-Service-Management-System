package com.itsm.itsm_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itsm.itsm_backend.entity.Service;

/**
 * This is the Repository interface for our Service entity.
 * By extending JpaRepository, we get a lot of standard database methods for free,
 * such as findAll(), findById(), save(), delete(), etc.
 * Spring will automatically implement this interface at runtime.
 */
@Repository // This annotation tells Spring that this is a repository bean
public interface ServiceRepository extends JpaRepository<Service, Integer> {
    // We can add custom query methods here in the future if we need them.
    // For now, the methods from JpaRepository are all we need.
}
