package com.springbootjwtpostgres.backend.order;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.basemodels.BasePage;
import com.springbootjwtpostgres.backend.orderdetail.OrderDetail;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepo repo;
    private final OrderCriteriaRepo criteriaRepo;

    public Page<Order> getAll(BasePage page, OrderSearchCriteria searchCriteria) {
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public Order getOne(Long id) throws NotFoundException {
        return this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Order.class.getSimpleName() + " not found"));
    }

    public Order create(Order newEntity) {
        return this.repo.save(newEntity);
    }

    public Order update(Long id, Order updatedEntity) throws NotFoundException {
        Order oldEntity = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Order.class.getSimpleName() + " not found"));
        oldEntity.setOrderType(updatedEntity.getOrderType());
        oldEntity.setOrderStatus(updatedEntity.getOrderStatus());
        oldEntity.setOrderTotalPrice(updatedEntity.getOrderTotalPrice());
        return this.repo.save(oldEntity);
    }

    public void delete(Long id) {
        this.repo.deleteById(id);
    }

    public double calOrderTotalPrice(List<OrderDetail> orderDetails) {
        return orderDetails
                .stream()
                .mapToDouble(orderDetail -> orderDetail.getTotalPricePerProduct())
                .sum();
    }
}
