package com.springbootjwtpostgres.backend.bill;

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
public class BillCriteriaRepo {
    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    public BillCriteriaRepo(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Bill> findAllWithFilters(BasePage page,
                                         BillSearchCriteria searchCriteria) {
        CriteriaQuery<Bill> criteriaQuery = this.criteriaBuilder.createQuery(Bill.class);
        Root<Bill> root = criteriaQuery.from(Bill.class);
        Predicate predicate = this.getPredicate(searchCriteria, root);
        criteriaQuery.where(predicate);
        setOrder(page, criteriaQuery, root);

        TypedQuery<Bill> typedQuery = this.entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(page.getPageNumber() * page.getPageSize());
        typedQuery.setMaxResults(page.getPageSize());

        Pageable pageable = this.getPageable(page);
        long count = this.getCount(predicate);
        return new PageImpl<>(typedQuery.getResultList(), pageable, count);
    }

    private Predicate getPredicate(BillSearchCriteria searchCriteria,
                                   Root<Bill> reportRoot) {
        List<Predicate> predicates = new ArrayList<>();
        if (Objects.nonNull(searchCriteria.getOrderId())) {
            predicates.add(
                    this.criteriaBuilder.equal(
                            reportRoot.get(Bill_.ORDER_ID),
                            searchCriteria.getOrderId()
                    )
            );
        }
        if (Objects.nonNull(searchCriteria.getBillType())) {
            predicates.add(
                    this.criteriaBuilder.equal(
                            reportRoot.get(Bill_.BILL_TYPE),
                            searchCriteria.getBillType())
            );
        }
        if (Objects.nonNull(searchCriteria.getBillStatus())) {
            predicates.add(
                    this.criteriaBuilder.equal(
                            reportRoot.get(Bill_.BILL_STATUS),
                            searchCriteria.getBillStatus())
            );
        }
        if (searchCriteria.getBillTotalPriceTo() > searchCriteria.getBillTotalPriceFrom()) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(Bill_.BILL_TOTAL_PRICE),
                            searchCriteria.getBillTotalPriceFrom(),
                            searchCriteria.getBillTotalPriceTo()
                    )
            );
        }
        if (
                Objects.nonNull(searchCriteria.getCreatedAtFrom())
                        && Objects.nonNull(searchCriteria.getCreatedAtTo())
        ) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(Bill_.CREATED_AT),
                            searchCriteria.getCreatedAtFrom(),
                            searchCriteria.getCreatedAtTo()
                    )
            );
        }
        return this.criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private void setOrder(BasePage basePage,
                          CriteriaQuery<Bill> criteriaQuery,
                          Root<Bill> root) {
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
        Root<Bill> countRoot = countQuery.from(Bill.class);
        countQuery
                .select(this.criteriaBuilder.count(countRoot))
                .where(predicate);
        return this.entityManager
                .createQuery(countQuery)
                .getSingleResult();
    }
}
