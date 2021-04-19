package com.springbootjwtpostgres.backend.orderdetail;

import com.springbootjwtpostgres.backend.basemodels.BasePage;
import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.order.OrderService;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@AllArgsConstructor
public class OrderDetailService {
    private final OrderDetailRepo repo;
    private final OrderDetailCriteriaRepo criteriaRepo;
    private final OrderService orderService;

    public Page<OrderDetail> getAll(
            BasePage page,
            OrderDetailSearchCriteria searchCriteria, Long orderId)
            throws NotFoundException {
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria, orderId);
    }

    public OrderDetail getOne(Long orderDetailId, Long orderId) throws NotFoundException {
        return this.repo.findById(orderDetailId)
                .orElseThrow(() -> new NotFoundException(OrderDetail.class.getSimpleName() + " not found"));
    }

    public OrderDetail create(OrderDetail newEntity, Long orderId) throws NotFoundException {
        Order order = this.orderService.getOne(orderId);
        newEntity.setCreatedAt(new Date());
        newEntity.setOrder(order);
        newEntity.setOrderId(order.getId());
        return this.repo.save(newEntity);
    }

    @Transactional
    public OrderDetail update(
            Long orderDetailId,
            OrderDetail updatedEntity, Long orderId) throws NotFoundException {
        OrderDetail oldEntity = this.repo.findById(orderDetailId)
                .orElseThrow(() -> new NotFoundException(OrderDetail.class.getSimpleName() + " not found"));
        oldEntity.setOrder(updatedEntity.getOrder());
        oldEntity.setProduct(updatedEntity.getProduct());
        oldEntity.setQuantity(updatedEntity.getQuantity());
        oldEntity.setTotalPricePerProduct(updatedEntity.getTotalPricePerProduct());

        oldEntity
                .getOrder()
                .setOrderTotalPrice(
                        oldEntity
                                .getOrder()
                                .getOrderTotalPrice() + oldEntity.getTotalPricePerProduct()
                );
        this.orderService.update(orderId, oldEntity.getOrder());
        return this.repo.save(oldEntity);
    }

    @Transactional
    public void delete(Long id, Long orderId) throws NotFoundException {
        OrderDetail orderDetail = this.getOne(id, orderId);
        Order order = this.orderService.getOne(orderId);

        order.setOrderTotalPrice(
                order.getOrderTotalPrice() - orderDetail.getTotalPricePerProduct()
        );
        this.orderService.update(orderId, order);
        this.repo.deleteById(id);
    }

    public double calTotalPricePerProduct(Order order, OrderDetail orderDetail) {
        double totalPricePerProduct = 0;
        switch (order.getOrderType()) {
            case BUY:
                totalPricePerProduct = orderDetail.getProduct().getProductPriceIn() * orderDetail.getQuantity();
                break;
            case SELL:
                totalPricePerProduct = orderDetail.getProduct().getProductPriceOut() * orderDetail.getQuantity();
                break;
        }
        return totalPricePerProduct;
    }
}
