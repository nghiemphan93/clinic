package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class InventoryStats extends BaseEntity {
    private Long beforeQuantity;
    private Long afterQuantity;

    @ManyToOne
    private Inventory inventory;
}
