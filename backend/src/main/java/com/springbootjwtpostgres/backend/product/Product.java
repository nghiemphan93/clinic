package com.springbootjwtpostgres.backend.product;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Product extends BaseEntity {
    private String productName;
    private String productCode;
    private double productPriceIn;
    private double productPriceOut;
    private String note;
}
