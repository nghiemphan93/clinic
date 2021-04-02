package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.order.OrderStatus;
import com.springbootjwtpostgres.backend.order.OrderType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private OrderType billType;
    private OrderStatus billStatus;
    private double billTotalPrice;
    private Date createdAt;

    @OneToOne
    private Order order;
}
