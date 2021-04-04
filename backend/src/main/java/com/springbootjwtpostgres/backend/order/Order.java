package com.springbootjwtpostgres.backend.order;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {
    private OrderType orderType;
    private OrderStatus orderStatus;
    private double orderTotalPrice;
}

