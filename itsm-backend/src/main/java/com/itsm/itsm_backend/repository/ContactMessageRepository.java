package com.itsm.itsm_backend.repository;

import com.itsm.itsm_backend.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> { }
