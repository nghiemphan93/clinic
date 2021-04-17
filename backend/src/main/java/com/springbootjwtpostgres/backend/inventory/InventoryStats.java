package com.springbootjwtpostgres.backend.inventory;

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
public class InventoryStats extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long beforeQuantity;
    private Long afterQuantity;
    private Date createdAt;

    @ManyToOne
    private Inventory inventory;
}
