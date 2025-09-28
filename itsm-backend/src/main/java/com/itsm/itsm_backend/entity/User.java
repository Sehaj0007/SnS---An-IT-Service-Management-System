package com.itsm.itsm_backend.entity;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*; // Added this import for @Enumerated

// --- NEW ---
// We define the possible roles as an enum for data integrity.
enum Role {
    USER,
    ADMIN
}
// ---

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "auth_provider", nullable = false)
    private String authProvider;

    // --- NEW FIELD ---
    @Enumerated(EnumType.STRING) // This tells the DB to store the role as a string (e.g., "USER")
    @Column(name = "role", nullable = false)
    private Role role;
    // ---

    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;
    
    // --- NEW METHOD ---
    // This method automatically sets a default role for any new users.
    // This ensures your existing registration page will still work perfectly.
    @PrePersist
    protected void onCreate() {
        if (this.role == null) {
            this.role = Role.USER;
        }
    }
    // ---

    // --- UserDetails Methods ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // --- UPDATED ---
        // This now returns the actual role from the database (e.g., "ROLE_ADMIN").
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
        // ---
    }

    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    // --- Getters and Setters ---
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getAuthProvider() { return authProvider; }
    public void setAuthProvider(String authProvider) { this.authProvider = authProvider; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    
    // --- NEW GETTER/SETTER ---
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    // ---
}