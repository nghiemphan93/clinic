package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.order.OrderStatus;
import com.springbootjwtpostgres.backend.order.OrderType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Bill extends BaseEntity {
    private OrderType billType;
    private OrderStatus billStatus;
    private double billTotalPrice;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "order_id", insertable = false, updatable = false)
    private Long orderId;
}
