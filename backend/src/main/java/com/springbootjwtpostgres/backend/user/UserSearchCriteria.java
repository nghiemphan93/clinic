package com.springbootjwtpostgres.backend.user;

import lombok.Data;

@Data
public class UserSearchCriteria {
    private String username;
    private String email;
}
