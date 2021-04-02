package com.springbootjwtpostgres.backend.report;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.basemodels.BasePage;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReportService {
    private final ReportRepo repo;
    private final ReportCriteriaRepo criteriaRepo;

    public Page<Report> getAll(BasePage page, ReportSearchCriteria searchCriteria) {
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public BaseEntity getOne(Long id) throws NotFoundException {
        return this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Report.class.getSimpleName() + " not found"));
    }

    public BaseEntity create(Report newEntity) {
        return this.repo.save(newEntity);
    }

    public BaseEntity update(Long id, Report updatedEntity) throws NotFoundException {
        Report oldEntity = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Report.class.getSimpleName() + " not found"));
        oldEntity.setReportPeriod(updatedEntity.getReportPeriod());
        oldEntity.setBeforeQuantity(updatedEntity.getBeforeQuantity());
        oldEntity.setAfterQuantity(updatedEntity.getAfterQuantity());
        oldEntity.setTotalPriceIn(updatedEntity.getTotalPriceIn());
        oldEntity.setTotalPriceOut(updatedEntity.getTotalPriceOut());
        return this.repo.save(oldEntity);
    }

    public void delete(Long id) {
        this.repo.deleteById(id);
    }

}
