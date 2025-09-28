package com.itsm.itsm_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itsm.itsm_backend.entity.Component;
import com.itsm.itsm_backend.repository.ComponentRepository;

/**
 * This is the Controller for our Component entity.
 * It creates the API endpoint to get all available PC components.
 */
@RestController
@RequestMapping("/api/components") // The URL for this controller will be /api/components
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
public class ComponentController {

    private final ComponentRepository componentRepository;

    @Autowired
    public ComponentController(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    /**
     * This method handles GET requests to /api/components.
     * It fetches all components from the database.
     * @return a List of all Component objects.
     */
    @GetMapping
    public List<Component> getAllComponents() {
        return componentRepository.findAll();
    }
}
