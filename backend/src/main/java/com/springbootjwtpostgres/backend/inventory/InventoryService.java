package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.product.Product;
import com.springbootjwtpostgres.backend.product.ProductService;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@AllArgsConstructor
public class InventoryService {
    private final InventoryRepo repo;
    private final InventoryStatsRepo inventoryStatsRepo;
    private final ProductService productService;

    public BaseEntity getOne(Long productId) throws NotFoundException {
        Product product = this.productService.getOne(productId);
        return this.repo.findByProduct(product);
    }

    public BaseEntity create(Inventory newEntity, Long productId) throws NotFoundException {
        Product product = this.productService.getOne(productId);
        newEntity.setProduct(product);
        newEntity.setCreatedAt(new Date());
        return this.repo.save(newEntity);
    }

    @Transactional
    public BaseEntity update(Inventory updatedInventory, Long productId) throws NotFoundException {
        Inventory oldInventory = (Inventory) this.getOne(productId);
        InventoryStats newInventoryStats = new InventoryStats();
        newInventoryStats.setInventory(updatedInventory);
        newInventoryStats.setBeforeQuantity(oldInventory.getCurrentQuantity());
        newInventoryStats.setAfterQuantity(updatedInventory.getCurrentQuantity());
        newInventoryStats.setCreatedAt(new Date());

        oldInventory.setCurrentQuantity(updatedInventory.getCurrentQuantity());
        oldInventory.setProduct(updatedInventory.getProduct());

        this.inventoryStatsRepo.save(newInventoryStats);
        return this.repo.save(oldInventory);
    }

    public void delete(Long productId) throws NotFoundException {
        Inventory inventory = (Inventory) this.getOne(productId);
        this.repo.deleteById(inventory.getId());
    }
}
