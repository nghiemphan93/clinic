package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.order.OrderStatus;
import com.springbootjwtpostgres.backend.order.OrderType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Bill extends BaseEntity {
    private OrderType billType;
    private OrderStatus billStatus;
    private double billTotalPrice;

    @OneToOne
    private Order order;
}
