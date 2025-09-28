// =================================================================
// Service.java (UPDATED CLASS)
// We are adding explicit Getters, Setters, and a no-argument constructor
// to ensure full compatibility with the JPA/Hibernate library.
// =================================================================
package com.itsm.itsm_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "service_name", nullable = false, length = 100)
    private String serviceName;

    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // --- CONSTRUCTORS ---

    // No-argument constructor (required by JPA)
    public Service() {
    }

    // --- GETTERS AND SETTERS ---

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}


// =================================================================
// Component.java (NO CHANGES)
// =================================================================
// ... existing Component.java code ...


// =================================================================
// User.java (NO CHANGES)
// =================================================================
// ... existing User.java code ...

