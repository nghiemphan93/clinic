package com.springbootjwtpostgres.backend.orderdetail;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.product.Product;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class OrderDetail extends BaseEntity {
    private int quantity;
    private double totalPricePerProduct;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Order order;
}
