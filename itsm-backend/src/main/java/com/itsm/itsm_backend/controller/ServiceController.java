package com.itsm.itsm_backend.controller;

import com.itsm.itsm_backend.entity.Service;
import com.itsm.itsm_backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    // FINAL FIX: Changed the mapping to be more explicit to avoid routing conflicts.
    @GetMapping("/details/{id}")
    public Service getServiceById(@PathVariable Integer id) {
        Optional<Service> serviceOptional = serviceRepository.findById(id);
        if (serviceOptional.isPresent()) {
            return serviceOptional.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        }
    }
}

