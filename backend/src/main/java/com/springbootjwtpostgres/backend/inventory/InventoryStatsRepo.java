package com.springbootjwtpostgres.backend.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryStatsRepo extends JpaRepository<InventoryStats, Long> {
    List<InventoryStats> findAllByInventory(Inventory inventory);
}
