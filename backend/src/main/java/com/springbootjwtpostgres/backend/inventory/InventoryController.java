package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products/{productId}/inventories")
@AllArgsConstructor
public class InventoryController {
    private final InventoryService service;

    @GetMapping
    public ResponseEntity<BaseEntity> getOne(@PathVariable Long productId)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(productId),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<BaseEntity> create(@RequestBody Inventory newEntity,
                                             @PathVariable Long productId) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.create(newEntity, productId),
                HttpStatus.OK
        );
    }

    @PutMapping
    public ResponseEntity<BaseEntity> update(@RequestBody Inventory updatedEntity,
                                             @PathVariable Long productId)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(updatedEntity, productId),
                HttpStatus.OK
        );
    }

    @DeleteMapping
    public void delete(@PathVariable Long productId) throws NotFoundException {
        this.service.delete(productId);
    }
}
