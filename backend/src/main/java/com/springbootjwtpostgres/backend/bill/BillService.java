package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.basemodels.BasePage;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BillService {
    private final BillRepo repo;
    private final BillCriteriaRepo criteriaRepo;

    public Page<Bill> getAll(
            BasePage page,
            BillSearchCriteria searchCriteria)
            throws NotFoundException {
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public BaseEntity getOne(Long billId) throws NotFoundException {
        return this.repo.findById(billId)
                .orElseThrow(() -> new NotFoundException(Bill.class.getSimpleName() + " not found"));
    }

    public BaseEntity create(Bill newEntity) {
        return this.repo.save(newEntity);
    }

    public BaseEntity update(
            Long billId,
            Bill updatedEntity) throws NotFoundException {
        Bill oldEntity = this.repo.findById(billId)
                .orElseThrow(() -> new NotFoundException(Bill.class.getSimpleName() + " not found"));
        oldEntity.setOrder(updatedEntity.getOrder());
        oldEntity.setBillType(updatedEntity.getBillType());
        oldEntity.setBillStatus(updatedEntity.getBillStatus());
        oldEntity.setBillTotalPrice(updatedEntity.getBillTotalPrice());
        return this.repo.save(oldEntity);
    }

    public void delete(Long id) {
        this.repo.deleteById(id);
    }
}
