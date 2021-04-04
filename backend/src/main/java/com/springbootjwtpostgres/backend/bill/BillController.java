package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders/{orderId}/bills")
@AllArgsConstructor
public class BillController {
    private final BillService service;

    @GetMapping
    public ResponseEntity<Page<Bill>> getAll(@PathVariable Long orderId,
                                             BillPage page,
                                             BillSearchCriteria searchCriteria) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getAll(orderId, page, searchCriteria),
                HttpStatus.OK
        );
    }

    @GetMapping("/{billId}")
    public ResponseEntity<BaseEntity> getOne(@PathVariable Long orderId,
                                             @PathVariable Long billId) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(orderId, billId),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<BaseEntity> create(@PathVariable Long orderId,
                                             @RequestBody Bill newEntity) {
        return new ResponseEntity<>(
                this.service.create(orderId, newEntity),
                HttpStatus.OK
        );
    }

    @PutMapping("/{billId}")
    public ResponseEntity<BaseEntity> update(@PathVariable Long orderId,
                                             @PathVariable Long billId,
                                             @RequestBody Bill updatedEntity)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(orderId, billId, updatedEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{billId}")
    public void delete(@PathVariable Long orderId, @PathVariable Long billId) {
        this.service.delete(orderId, billId);
    }
}
