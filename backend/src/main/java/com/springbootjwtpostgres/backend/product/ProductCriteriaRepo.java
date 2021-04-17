package com.springbootjwtpostgres.backend.product;

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
public class ProductCriteriaRepo {
    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    public ProductCriteriaRepo(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Product> findAllWithFilters(BasePage page, ProductSearchCriteria searchCriteria) {
        CriteriaQuery<Product> criteriaQuery = this.criteriaBuilder.createQuery(Product.class);
        Root<Product> root = criteriaQuery.from(Product.class);
        Predicate predicate = this.getPredicate(searchCriteria, root);
        criteriaQuery.where(predicate);
        setOrder(page, criteriaQuery, root);

        TypedQuery<Product> typedQuery = this.entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(page.getPageNumber() * page.getPageSize());
        typedQuery.setMaxResults(page.getPageSize());

        Pageable pageable = this.getPageable(page);
        long count = this.getCount(predicate);
        return new PageImpl<>(typedQuery.getResultList(), pageable, count);
    }

    private Predicate getPredicate(ProductSearchCriteria searchCriteria,
                                   Root<Product> reportRoot) {
        List<Predicate> predicates = new ArrayList<>();
        if (Objects.nonNull(searchCriteria.getProductName())) {
            predicates.add(
                    this.criteriaBuilder.like(
                            this.criteriaBuilder.upper(reportRoot.get(Product_.PRODUCT_NAME)),
                            "%" + searchCriteria.getProductName().toUpperCase() + "%")
            );
        }
        if (Objects.nonNull(searchCriteria.getProductCode())) {
            predicates.add(
                    this.criteriaBuilder.like(
                            this.criteriaBuilder.upper(reportRoot.get(Product_.PRODUCT_CODE)),
                            "%" + searchCriteria.getProductCode().toUpperCase() + "%")
            );
        }
        if (Objects.nonNull(searchCriteria.getNote())) {
            predicates.add(
                    this.criteriaBuilder.like(
                            this.criteriaBuilder.upper(reportRoot.get(Product_.NOTE)),
                            "%" + searchCriteria.getNote().toUpperCase() + "%")
            );
        }
        if (searchCriteria.getProductPriceInTo() > searchCriteria.getProductPriceInFrom()) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(Product_.PRODUCT_PRICE_IN),
                            searchCriteria.getProductPriceInFrom(),
                            searchCriteria.getProductPriceInTo()
                    )
            );
        }
        if (searchCriteria.getProductPriceOutTo() > searchCriteria.getProductPriceOutFrom()) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(Product_.PRODUCT_PRICE_OUT),
                            searchCriteria.getProductPriceOutFrom(),
                            searchCriteria.getProductPriceOutTo()
                    )
            );
        }
        if (
                Objects.nonNull(searchCriteria.getCreatedAtFrom())
                        && Objects.nonNull(searchCriteria.getCreatedAtTo())
        ) {
            predicates.add(
                    this.criteriaBuilder.between(
                            reportRoot.get(Product_.CREATED_AT),
                            searchCriteria.getCreatedAtFrom(),
                            searchCriteria.getCreatedAtTo()
                    )
            );
        }
        return this.criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }


    private void setOrder(BasePage basePage,
                          CriteriaQuery<Product> criteriaQuery,
                          Root<Product> root) {
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
        Root<Product> countRoot = countQuery.from(Product.class);
        countQuery
                .select(this.criteriaBuilder.count(countRoot))
                .where(predicate);
        return this.entityManager
                .createQuery(countQuery)
                .getSingleResult();
    }
}
