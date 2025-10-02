package com.itsm.itsm_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itsm.itsm_backend.entity.PcOrder;
import com.itsm.itsm_backend.entity.User;

@Repository
public interface PcOrderRepository extends JpaRepository<PcOrder, Long> {
    // This method finds all orders for a given user, ordered by the most recent first.
    List<PcOrder> findByUserOrderByOrderDateDesc(User user);

    // --- NEW METHOD FOR ADMIN DASHBOARD ---
    // This method finds all orders from all users and sorts them by the newest first.
    List<PcOrder> findAllByOrderByOrderDateDesc();
}

