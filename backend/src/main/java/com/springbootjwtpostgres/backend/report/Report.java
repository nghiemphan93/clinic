package com.springbootjwtpostgres.backend.report;

import com.springbootjwtpostgres.backend.basemodels.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Report extends BaseEntity {
    private ReportPeriod reportPeriod;
    private int beforeQuantity;
    private int afterQuantity;
    private double totalPriceIn;
    private double totalPriceOut;
}
