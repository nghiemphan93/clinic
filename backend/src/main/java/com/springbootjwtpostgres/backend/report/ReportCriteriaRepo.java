package com.springbootjwtpostgres.backend.report;

import com.springbootjwtpostgres.backend.basemodels.BasePage;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class ReportCriteriaRepo {
    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    public ReportCriteriaRepo(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Report> findAllWithFilters(BasePage page,
                                           ReportSearchCriteria searchCriteria) {
        CriteriaQuery<Report> criteriaQuery = this.criteriaBuilder.createQuery(Report.class);
        Root<Report> root = criteriaQuery.from(Report.class);
        Predicate predicate = this.getPredicate(searchCriteria, root);
        criteriaQuery.where(predicate);
        setOrder(page, criteriaQuery, root);

        TypedQuery<Report> typedQuery = this.entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(page.getPageNumber() * page.getPageSize());
        typedQuery.setMaxResults(page.getPageSize());

        Pageable pageable = this.getPageable(page);
        long count = this.getCount(predicate);
        return new PageImpl<>(typedQuery.getResultList(), pageable, count);
    }

    private Predicate getPredicate(ReportSearchCriteria reportSearchCriteria,
                                   Root<Report> reportRoot) {
        List<Predicate> predicates = new ArrayList<>();
        if (Objects.nonNull(reportSearchCriteria.getReportPeriod())) {
            predicates.add(
                    this.criteriaBuilder.equal(
                            reportRoot.get(Report_.REPORT_PERIOD),
                            reportSearchCriteria.getReportPeriod())
            );
        }
        if (
                Objects.nonNull(reportSearchCriteria.getCreatedAtFrom())
                        && Objects.nonNull(reportSearchCriteria.getCreatedAtTo())
        ) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(Report_.CREATED_AT),
                            reportSearchCriteria.getCreatedAtFrom(),
                            reportSearchCriteria.getCreatedAtTo()
                    )
            );
        }
        return this.criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private void setOrder(BasePage basePage,
                          CriteriaQuery<Report> criteriaQuery,
                          Root<Report> root) {
        if (basePage.getSortDirection().equals(Sort.Direction.ASC)) {
            criteriaQuery.orderBy(this.criteriaBuilder.asc(root.get(basePage.getSortBy())));
        } else {
            criteriaQuery.orderBy(this.criteriaBuilder.desc(root.get(basePage.getSortBy())));
        }
    }

    private Pageable getPageable(BasePage basePage) {
        Sort sort = Sort.by(basePage.getSortDirection(), basePage.getSortBy());
        return PageRequest.of(basePage.getPageNumber(), basePage.getPageSize(), sort);
    }

    private long getCount(Predicate predicate) {
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Report> countRoot = countQuery.from(Report.class);
        countQuery
                .select(this.criteriaBuilder.count(countRoot))
                .where(predicate);
        return this.entityManager
                .createQuery(countQuery)
                .getSingleResult();
    }
}
