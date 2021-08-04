package com.springbootjwtpostgres.backend.order;

import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService service;

    @GetMapping
    public ResponseEntity<Page<Order>> getAll(OrderPage page,
                                              OrderSearchCriteria searchCriteria) {
        return new ResponseEntity<>(
                this.service.getAll(page, searchCriteria),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOne(@PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Order newEntity) {
        return new ResponseEntity<>(
                this.service.create(newEntity),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> update(@PathVariable Long id,
                                        @RequestBody Order updatedEntity)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(id, updatedEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id) {
        this.service.delete(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> getOnePdf(@PathVariable Long id) throws NotFoundException, JRException, IOException {
        return ResponseEntity
                .ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=\"" + "invoice " + id + ".pdf\"")
                .body(this.service.getOnePdf(id));
    }
}
