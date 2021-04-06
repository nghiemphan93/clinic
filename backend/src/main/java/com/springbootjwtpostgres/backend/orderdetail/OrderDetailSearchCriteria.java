package com.springbootjwtpostgres.backend.orderdetail;

import com.springbootjwtpostgres.backend.order.Order;
import lombok.Data;

import java.util.Date;

@Data
public class OrderDetailSearchCriteria {
    private int quantityFrom;
    private int quantityTo;
    private double totalPricePerProductFrom;
    private double totalPricePerProductTo;
    private Date createdAtFrom;
    private Date createdAtTo;
    private Long orderId;
    private Long productId;
}
