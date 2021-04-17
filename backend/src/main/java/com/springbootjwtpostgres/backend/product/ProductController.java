package com.springbootjwtpostgres.backend.product;


import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public ResponseEntity<Page<Product>> getAll(ProductPage reportPage,
                                                ProductSearchCriteria searchCriteria) {
        return new ResponseEntity<>(
                this.service.getAll(reportPage, searchCriteria),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseEntity> getOne(@PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<BaseEntity> create(@RequestBody Product newEntity) {
        return new ResponseEntity<>(
                this.service.create(newEntity),
                HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseEntity> update(@PathVariable Long id,
                                             @RequestBody Product updatedEntity)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.service.update(id, updatedEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.service.delete(id);
    }
}
