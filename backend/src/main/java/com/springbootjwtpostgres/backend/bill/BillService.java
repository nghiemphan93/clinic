package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.basemodels.BasePage;
import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.order.OrderService;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BillService {
    private final BillRepo repo;
    private final BillCriteriaRepo criteriaRepo;
    private final OrderService orderService;

    public Page<Bill> getAll(Long orderId,
                             BasePage page,
                             BillSearchCriteria searchCriteria)
            throws NotFoundException {
        Order order = (Order) this.orderService.getOne(orderId);
        searchCriteria.setOrder(order);
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public BaseEntity getOne(Long orderId, Long billId) throws NotFoundException {
        return this.repo.findById(billId)
                .orElseThrow(() -> new NotFoundException(Bill.class.getSimpleName() + " not found"));
    }

    public BaseEntity create(Long orderId, Bill newEntity) {
        return this.repo.save(newEntity);
    }

    public BaseEntity update(Long orderId,
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

    public void delete(Long orderId, Long id) {
        this.repo.deleteById(id);
    }
}
