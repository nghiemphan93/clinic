package com.springbootjwtpostgres.backend.orderdetail;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders/{orderId}/orderDetails")
@AllArgsConstructor
public class OrderDetailController {
    private final OrderDetailService service;

    @GetMapping
    public ResponseEntity<Page<OrderDetail>> getAll(
            @PathVariable Long orderId,
            OrderDetailPage page,
            OrderDetailSearchCriteria searchCriteria) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getAll(page, searchCriteria, orderId),
                HttpStatus.OK
        );
    }

    @GetMapping("/{orderDetailId}")
    public ResponseEntity<BaseEntity> getOne(
            @PathVariable Long orderId,
            @PathVariable Long orderDetailId) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(orderDetailId, orderId),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<BaseEntity> create(
            @PathVariable Long orderId,
            @RequestBody OrderDetail newEntity
    ) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.create(newEntity, orderId),
                HttpStatus.OK
        );
    }

    @PutMapping("/{orderDetailId}")
    public ResponseEntity<BaseEntity> update(
            @PathVariable Long orderId,
            @PathVariable Long orderDetailId,
            @RequestBody OrderDetail updatedEntity)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(orderDetailId, updatedEntity, orderId),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{orderDetailId}")
    public void delete(
            @PathVariable Long orderId,
            @PathVariable Long orderDetailId) throws NotFoundException {
        this.service.delete(orderDetailId, orderId);
    }
}
