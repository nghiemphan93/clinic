package com.springbootjwtpostgres.backend.order;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Invoice {
    private Long row_number;
    private Long order_id;
    private OrderType order_type;
    private String product_name;
    private String product_code;
    private int quantity;
    private double price;
    private double total_price_per_product;
    private double order_total_price;
}
