package com.itsm.itsm_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itsm.itsm_backend.entity.User;

/**
 * This is the Repository interface for our User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Custom query to find a user by their email address.
     * Spring Data JPA automatically creates the implementation for this method
     * based on its name. This is crucial for Spring Security.
     *
     * @param email The email address to search for.
     * @return An Optional containing the User if found, or an empty Optional otherwise.
     */
    Optional<User> findByEmail(String email);

}