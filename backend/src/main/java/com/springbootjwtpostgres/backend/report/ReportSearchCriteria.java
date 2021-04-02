package com.springbootjwtpostgres.backend.report;

import lombok.Data;

import java.util.Date;

@Data
public class ReportSearchCriteria {
    private ReportPeriod reportPeriod;
    private Date createdAtFrom;
    private Date createdAtTo;
}
