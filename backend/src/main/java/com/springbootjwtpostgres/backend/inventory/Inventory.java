package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.product.Product;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Inventory extends BaseEntity {
    private Long currentQuantity;

    @OneToOne
    private Product product;
}
