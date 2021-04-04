package com.springbootjwtpostgres.backend.orderdetail;

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
public class OrderDetailService {
    private final OrderDetailRepo repo;
    private final OrderDetailCriteriaRepo criteriaRepo;
    private final OrderService orderService;

    public Page<OrderDetail> getAll(Long orderId,
                                    BasePage page,
                                    OrderDetailSearchCriteria searchCriteria)
            throws NotFoundException {
        Order order = (Order) this.orderService.getOne(orderId);
        searchCriteria.setOrder(order);
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public BaseEntity getOne(Long orderId, Long orderDetailId) throws NotFoundException {
        return this.repo.findById(orderDetailId)
                .orElseThrow(() -> new NotFoundException(OrderDetail.class.getSimpleName() + " not found"));
    }

    public BaseEntity create(Long orderId, OrderDetail newEntity) {
        return this.repo.save(newEntity);
    }

    public BaseEntity update(Long orderId,
                             Long orderDetailId,
                             OrderDetail updatedEntity) throws NotFoundException {
        OrderDetail oldEntity = this.repo.findById(orderDetailId)
                .orElseThrow(() -> new NotFoundException(OrderDetail.class.getSimpleName() + " not found"));
        oldEntity.setOrder(updatedEntity.getOrder());
        oldEntity.setProduct(updatedEntity.getProduct());
        oldEntity.setQuantity(updatedEntity.getQuantity());
        oldEntity.setTotalPricePerProduct(updatedEntity.getTotalPricePerProduct());
        return this.repo.save(oldEntity);
    }

    public void delete(Long orderId, Long id) {
        this.repo.deleteById(id);
    }
}
