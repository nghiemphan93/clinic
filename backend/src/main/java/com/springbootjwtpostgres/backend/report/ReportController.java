package com.springbootjwtpostgres.backend.report;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@AllArgsConstructor
public class ReportController {
    private final ReportService service;

    @GetMapping
    public ResponseEntity<Page<Report>> getAll(ReportPage page,
                                               ReportSearchCriteria searchCriteria) {
        return new ResponseEntity<>(
                this.service.getAll(page, searchCriteria),
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
    public ResponseEntity<BaseEntity> create(@RequestBody Report newEntity) {
        return new ResponseEntity<>(
                this.service.create(newEntity),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseEntity> update(@PathVariable Long id,
                                             @RequestBody Report updatedEntity)
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
}
