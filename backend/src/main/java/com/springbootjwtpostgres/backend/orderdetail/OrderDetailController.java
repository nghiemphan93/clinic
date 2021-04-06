package com.springbootjwtpostgres.backend.orderdetail;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orderDetails")
@AllArgsConstructor
public class OrderDetailController {
    private final OrderDetailService service;

    @GetMapping
    public ResponseEntity<Page<OrderDetail>> getAll(
            OrderDetailPage page,
            OrderDetailSearchCriteria searchCriteria) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getAll(page, searchCriteria),
                HttpStatus.OK
        );
    }

    @GetMapping("/{orderDetailId}")
    public ResponseEntity<BaseEntity> getOne(
            @PathVariable Long orderDetailId) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(orderDetailId),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<BaseEntity> create(@RequestBody OrderDetail newEntity) {
        return new ResponseEntity<>(
                this.service.create(newEntity),
                HttpStatus.OK
        );
    }

    @PutMapping("/{orderDetailId}")
    public ResponseEntity<BaseEntity> update(@PathVariable Long orderDetailId,
                                             @RequestBody OrderDetail updatedEntity)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(orderDetailId, updatedEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{orderDetailId}")
    public void delete(@PathVariable Long orderDetailId) {
        this.service.delete(orderDetailId);
    }
}
