package com.springbootjwtpostgres.backend.order;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderSearchCriteria {
    private List<OrderType> orderTypes;
    private List<OrderStatus> orderStatuses;
    private double orderTotalPriceFrom;
    private double orderTotalPriceTo;
    private Date createdAtFrom;
    private Date createdAtTo;
}
