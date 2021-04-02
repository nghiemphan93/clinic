package com.springbootjwtpostgres.backend.report;

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
    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<Page<Report>> getAll(ReportPage reportPage,
                                                   ReportSearchCriteria reportSearchCriteria) {
        return new ResponseEntity<>(
                this.reportService.getAll(reportPage, reportSearchCriteria),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getOne(@PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(
                this.reportService.getOne(id),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<Report> create(@RequestBody Report report) {
        return new ResponseEntity<>(
                this.reportService.create(report),
                HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Report> update(@PathVariable Long id,
                                               @RequestBody Report newEntity)
            throws NotFoundException {
        return new ResponseEntity<>(
                this.reportService.update(id, newEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.reportService.delete(id);
    }
}
