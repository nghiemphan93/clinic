package com.springbootjwtpostgres.backend.product;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.basemodels.BasePage;
import com.springbootjwtpostgres.backend.inventory.InventoryRepo;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepo repo;
    private final ProductCriteriaRepo criteriaRepo;
    private final InventoryRepo inventoryRepo;

    public Page<Product> getAll(BasePage page, ProductSearchCriteria searchCriteria) {
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public Product getOne(Long id) throws NotFoundException {
        return this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Product.class.getSimpleName() + " not found"));
    }

    @Transactional
    public Product create(Product newEntity) {
        newEntity.getInventory().setCreatedAt(new Date());
        newEntity.setInventory(this.inventoryRepo.save(newEntity.getInventory()));
        newEntity.setCreatedAt(new Date());
        return this.repo.save(newEntity);
    }

    public BaseEntity update(Long id, Product updatedEntity) throws NotFoundException {
        Product oldEntity = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Product.class.getSimpleName() + " not found"));
        oldEntity.setProductCode(updatedEntity.getProductCode());
        oldEntity.setProductName(updatedEntity.getProductName());
        oldEntity.setProductPriceIn(updatedEntity.getProductPriceIn());
        oldEntity.setProductPriceOut(updatedEntity.getProductPriceOut());
        oldEntity.setNote(updatedEntity.getNote());
        oldEntity.getInventory().setCurrentQuantity(updatedEntity.getInventory().getCurrentQuantity());
        return this.repo.save(oldEntity);
    }

    public void delete(Long id) {
        this.repo.deleteById(id);
    }
}
