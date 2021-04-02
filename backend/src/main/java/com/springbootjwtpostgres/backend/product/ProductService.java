package com.springbootjwtpostgres.backend.product;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.basemodels.BasePage;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepo repo;
    private final ProductCriteriaRepo criteriaRepo;


    public Page<Product> getAll(BasePage page, ProductSearchCriteria searchCriteria) {
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public Product getOne(Long id) throws NotFoundException {
        return this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Product.class.getSimpleName() + " not found"));
    }

    public Product create(Product newEntity) {
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
        return this.repo.save(oldEntity);
    }

    public void delete(Long id) {
        this.repo.deleteById(id);
    }
}
