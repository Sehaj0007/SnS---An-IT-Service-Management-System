package com.itsm.itsm_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itsm.itsm_backend.entity.ContactMessage;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> { }
