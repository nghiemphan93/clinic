package com.springbootjwtpostgres.backend.order;

import lombok.Data;

import java.util.Date;

@Data
public class OrderSearchCriteria {
    private OrderType orderType;
    private OrderStatus orderStatus;
    private double orderTotalPriceFrom;
    private double orderTotalPriceTo;
    private Date createdAtFrom;
    private Date createdAtTo;
}
