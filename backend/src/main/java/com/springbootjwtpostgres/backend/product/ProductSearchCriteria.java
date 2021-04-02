package com.springbootjwtpostgres.backend.product;

import lombok.Data;

import java.util.Date;

@Data
public class ProductSearchCriteria {
    private String productName;
    private String productCode;
    private double productPriceInFrom;
    private double productPriceInTo;
    private double productPriceOutFrom;
    private double productPriceOutTo;
    private String note;
    private Date createdAtFrom;
    private Date createdAtTo;
}
