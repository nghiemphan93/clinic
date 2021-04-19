package com.springbootjwtpostgres.backend.order;

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
public class OrderCriteriaRepo {
    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    public OrderCriteriaRepo(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Order> findAllWithFilters(BasePage page,
                                          OrderSearchCriteria searchCriteria) {
        CriteriaQuery<Order> criteriaQuery = this.criteriaBuilder.createQuery(Order.class);
        Root<Order> root = criteriaQuery.from(Order.class);
        Predicate predicate = this.getPredicate(searchCriteria, root);
        criteriaQuery.where(predicate);
        setOrder(page, criteriaQuery, root);

        TypedQuery<Order> typedQuery = this.entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(page.getPageNumber() * page.getPageSize());
        typedQuery.setMaxResults(page.getPageSize());

        Pageable pageable = this.getPageable(page);
        long count = this.getCount(predicate);
        return new PageImpl<>(typedQuery.getResultList(), pageable, count);
    }

    private Predicate getPredicate(OrderSearchCriteria searchCriteria,
                                   Root<Order> root) {
        List<Predicate> predicates = new ArrayList<>();
        if (Objects.nonNull(searchCriteria.getOrderTypes())) {
            List<Predicate> partPredicates = new ArrayList<>();
            searchCriteria.getOrderTypes().forEach(orderType ->
                    partPredicates.add(
                            this.criteriaBuilder.equal(
                                    root.get(Order_.ORDER_TYPE),
                                    orderType
                            )
                    ));
            predicates.add(
                    this.criteriaBuilder
                            .or(partPredicates.toArray(
                                    new Predicate[0]
                            ))
            );
        }
        if (Objects.nonNull(searchCriteria.getOrderStatuses())) {
            List<Predicate> partPredicates = new ArrayList<>();
            searchCriteria.getOrderStatuses().forEach(orderStatus ->
                    partPredicates.add(
                            this.criteriaBuilder.equal(
                                    root.get(Order_.ORDER_STATUS),
                                    orderStatus
                            )
                    ));
            predicates.add(
                    this.criteriaBuilder
                            .or(partPredicates.toArray(
                                    new Predicate[0]
                            ))
            );
        }
        if (searchCriteria.getOrderTotalPriceTo() > searchCriteria.getOrderTotalPriceFrom()) {
            predicates.add(
                    this.criteriaBuilder.between(
                            root.get(Order_.ORDER_TOTAL_PRICE),
                            searchCriteria.getOrderTotalPriceFrom(),
                            searchCriteria.getOrderTotalPriceTo()
                    )
            );
        }
        if (
                Objects.nonNull(searchCriteria.getCreatedAtFrom())
                        && Objects.nonNull(searchCriteria.getCreatedAtTo())
        ) {
            predicates.add(
                    this.criteriaBuilder.between(
                            root.get(Order_.CREATED_AT),
                            searchCriteria.getCreatedAtFrom(),
                            searchCriteria.getCreatedAtTo()
                    )
            );
        }
        return this.criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private void setOrder(BasePage basePage,
                          CriteriaQuery<Order> criteriaQuery,
                          Root<Order> root) {
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
        Root<Order> countRoot = countQuery.from(Order.class);
        countQuery
                .select(this.criteriaBuilder.count(countRoot))
                .where(predicate);
        return this.entityManager
                .createQuery(countQuery)
                .getSingleResult();
    }
}
