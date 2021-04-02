package com.springbootjwtpostgres.backend.report;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private ReportPeriod reportPeriod;
    private int beforeQuantity;
    private int afterQuantity;
    private double totalPriceIn;
    private double totalPriceOut;
    private Date createdAt;
}
