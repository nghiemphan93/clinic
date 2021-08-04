package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bills")
@AllArgsConstructor
public class BillController {
    private final BillService service;

    @GetMapping
    public ResponseEntity<Page<Bill>> getAll(
            BillPage page,
            BillSearchCriteria searchCriteria) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getAll(page, searchCriteria),
                HttpStatus.OK
        );
    }

    @GetMapping("/{billId}")
    public ResponseEntity<BaseEntity> getOne(
            @PathVariable Long billId) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(billId),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<BaseEntity> create(@RequestBody Bill newEntity) {
        return new ResponseEntity<>(
                this.service.create(newEntity),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{billId}")
    public ResponseEntity<BaseEntity> update(@PathVariable Long billId,
                                             @RequestBody Bill updatedEntity)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(billId, updatedEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{billId}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long billId) {
        this.service.delete(billId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
