package com.springbootjwtpostgres.backend.report;

import com.springbootjwtpostgres.backend.basemodels.BasePage;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReportService {
    private final ReportRepo reportRepo;
    private final ReportCriteriaRepo reportCriteriaRepo;

    public Page<Report> getAll(BasePage page, ReportSearchCriteria reportSearchCriteria) {
        return this.reportCriteriaRepo.findAllWithFilters(page, reportSearchCriteria);
    }

    public Report getOne(Long id) throws NotFoundException {
        return this.reportRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(Report.class.getSimpleName() + " not found"));
    }

    public Report create(Report report) {
        return this.reportRepo.save(report);
    }

    public Report update(Long id, Report updatedEntity) throws NotFoundException {
        Report oldReport = this.reportRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(Report.class.getSimpleName() + " not found"));
        oldReport.setReportPeriod(updatedEntity.getReportPeriod());
        oldReport.setBeforeQuantity(updatedEntity.getBeforeQuantity());
        oldReport.setAfterQuantity(updatedEntity.getAfterQuantity());
        oldReport.setTotalPriceIn(updatedEntity.getTotalPriceIn());
        oldReport.setTotalPriceOut(updatedEntity.getTotalPriceOut());
        return this.reportRepo.save(oldReport);
    }

    public void delete(Long id) {
        this.reportRepo.deleteById(id);
    }

}
