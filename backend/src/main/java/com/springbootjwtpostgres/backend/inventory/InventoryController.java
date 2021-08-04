package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.HttpAccessor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products/{productId}/inventories")
@AllArgsConstructor
public class InventoryController {
    private final InventoryService service;

    @GetMapping("/{inventoryId}")
    public ResponseEntity<BaseEntity> getOne(@PathVariable Long productId, @PathVariable Long inventoryId)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(productId, inventoryId),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<BaseEntity> create(@RequestBody Inventory newEntity,
                                             @PathVariable Long productId) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.create(newEntity, productId),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{inventoryId}")
    public ResponseEntity<BaseEntity> update(@RequestBody Inventory updatedEntity,
                                             @PathVariable Long productId,
                                             @PathVariable Long inventoryId)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(updatedEntity, productId, inventoryId),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{inventoryId}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long productId, @PathVariable Long inventoryId) throws NotFoundException {
        this.service.delete(productId, inventoryId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
