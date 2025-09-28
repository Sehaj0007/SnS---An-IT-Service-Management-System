package com.itsm.itsm_backend.repository;

import com.itsm.itsm_backend.entity.PcOrder;
import com.itsm.itsm_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PcOrderRepository extends JpaRepository<PcOrder, Long> {
    // This method finds all orders for a given user, ordered by the most recent first.
    List<PcOrder> findByUserOrderByOrderDateDesc(User user);
}

