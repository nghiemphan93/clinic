package com.springbootjwtpostgres.backend.orderdetail;

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
public class OrderDetailCriteriaRepo {
    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    public OrderDetailCriteriaRepo(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<OrderDetail> findAllWithFilters(BasePage page,
                                                OrderDetailSearchCriteria searchCriteria,
                                                Long orderId) {
        CriteriaQuery<OrderDetail> criteriaQuery = this.criteriaBuilder.createQuery(OrderDetail.class);
        Root<OrderDetail> root = criteriaQuery.from(OrderDetail.class);
        Predicate predicate = this.getPredicate(searchCriteria, root);
        criteriaQuery.where(predicate);
        setOrder(page, criteriaQuery, root);

        TypedQuery<OrderDetail> typedQuery = this.entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(page.getPageNumber() * page.getPageSize());
        typedQuery.setMaxResults(page.getPageSize());

        Pageable pageable = this.getPageable(page);
        long count = this.getCount(predicate);
        return new PageImpl<>(typedQuery.getResultList(), pageable, count);
    }

    private Predicate getPredicate(OrderDetailSearchCriteria searchCriteria,
                                   Root<OrderDetail> reportRoot) {
        List<Predicate> predicates = new ArrayList<>();
        if (Objects.nonNull(searchCriteria.getOrderId())) {
            predicates.add(
                    this.criteriaBuilder.equal(
                            reportRoot.get(OrderDetail_.ORDER_ID),
                            searchCriteria.getOrderId()
                    )
            );
        }
        if (Objects.nonNull(searchCriteria.getProductId())) {
            predicates.add(
                    this.criteriaBuilder.equal(
                            reportRoot.get(OrderDetail_.PRODUCT_ID),
                            searchCriteria.getProductId()
                    )
            );
        }
        if (searchCriteria.getQuantityTo() > searchCriteria.getQuantityFrom()) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(OrderDetail_.QUANTITY),
                            searchCriteria.getQuantityFrom(),
                            searchCriteria.getQuantityTo()
                    )
            );
        }
        if (searchCriteria.getTotalPricePerProductTo() > searchCriteria.getTotalPricePerProductFrom()) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(OrderDetail_.TOTAL_PRICE_PER_PRODUCT),
                            searchCriteria.getTotalPricePerProductFrom(),
                            searchCriteria.getTotalPricePerProductTo()
                    )
            );
        }
        if (
                Objects.nonNull(searchCriteria.getCreatedAtFrom())
                        && Objects.nonNull(searchCriteria.getCreatedAtTo())
        ) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(OrderDetail_.CREATED_AT),
                            searchCriteria.getCreatedAtFrom(),
                            searchCriteria.getCreatedAtTo()
                    )
            );
        }
        return this.criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private void setOrder(BasePage basePage,
                          CriteriaQuery<OrderDetail> criteriaQuery,
                          Root<OrderDetail> root) {
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
        Root<OrderDetail> countRoot = countQuery.from(OrderDetail.class);
        countQuery
                .select(this.criteriaBuilder.count(countRoot))
                .where(predicate);
        return this.entityManager
                .createQuery(countQuery)
                .getSingleResult();
    }
}
