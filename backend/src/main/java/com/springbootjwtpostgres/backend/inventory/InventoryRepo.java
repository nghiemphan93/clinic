package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, Long> {
    Inventory findByProduct(Product product);
}
