package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.order.OrderStatus;
import com.springbootjwtpostgres.backend.order.OrderType;
import lombok.Data;

import java.util.Date;

@Data
public class BillSearchCriteria {
    private OrderType billType;
    private OrderStatus billStatus;
    private double billTotalPriceFrom;
    private double billTotalPriceTo;
    private Date createdAtFrom;
    private Date createdAtTo;
    private Order order;
}
