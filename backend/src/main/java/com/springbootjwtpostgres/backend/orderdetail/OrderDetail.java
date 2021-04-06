package com.springbootjwtpostgres.backend.orderdetail;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.product.Product;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class OrderDetail extends BaseEntity {
    private int quantity;
    private double totalPricePerProduct;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;
    @Column(name = "product_id", insertable = false, updatable = false)
    private Long productId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private Order order;
    @Column(name = "order_id", insertable = false, updatable = false)
    private Long orderId;
}
