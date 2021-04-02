package com.springbootjwtpostgres.backend.order;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private OrderType orderType;
    private OrderStatus orderStatus;
    private double orderTotalPrice;
    private Date createdAt;
}

