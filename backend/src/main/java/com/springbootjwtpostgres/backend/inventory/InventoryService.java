package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.product.Product;
import com.springbootjwtpostgres.backend.product.ProductService;
import com.springbootjwtpostgres.backend.user.User;
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

    public BaseEntity getOne(Long productId, Long inventoryId) throws NotFoundException {
        Product product = this.productService.getOne(productId);
        return this.repo.findById(inventoryId)
                .orElseThrow(() -> new NotFoundException(User.class.getSimpleName() + " not found"));
    }

    public BaseEntity create(Inventory newEntity, Long productId) throws NotFoundException {
        newEntity.setCreatedAt(new Date());
        return this.repo.save(newEntity);
    }

    @Transactional
    public BaseEntity update(Inventory updatedInventory, Long productId, Long inventoryId) throws NotFoundException {
        Inventory oldInventory = (Inventory) this.getOne(productId, inventoryId);
        InventoryStats newInventoryStats = new InventoryStats();
        newInventoryStats.setInventory(updatedInventory);
        newInventoryStats.setBeforeQuantity(oldInventory.getCurrentQuantity());
        newInventoryStats.setAfterQuantity(updatedInventory.getCurrentQuantity());
        newInventoryStats.setCreatedAt(new Date());

        oldInventory.setCurrentQuantity(updatedInventory.getCurrentQuantity());
//        oldInventory.setProduct(updatedInventory.getProduct());

        this.inventoryStatsRepo.save(newInventoryStats);
        return this.repo.save(oldInventory);
    }

    @Transactional
    public void delete(Long productId, Long inventoryId) throws NotFoundException {
        Inventory inventory = (Inventory) this.getOne(productId, inventoryId);
        Product updatedProduct = (Product)this.productService.getOne(productId);
        updatedProduct.setInventory(null);

        this.repo.deleteById(inventoryId);
        this.productService.update(productId, updatedProduct);
    }
}
