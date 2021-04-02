package com.springbootjwtpostgres.backend.basemodels;

import com.springbootjwtpostgres.backend.user.User_;
import lombok.Data;
import org.springframework.data.domain.Sort;

@Data
public class BasePage {
    private int pageNumber = 0;
    private int pageSize = 10;
    private Sort.Direction sortDirection = Sort.Direction.ASC;
    private String sortBy = User_.ID;
}
