package com.springbootjwtpostgres.backend.report;

import com.springbootjwtpostgres.backend.basemodels.BasePage;
import com.springbootjwtpostgres.backend.user.User_;
import org.springframework.data.domain.Sort;

public class ReportPage extends BasePage {
    private String sortBy = Report_.CREATED_AT;
}
