package com.springbootjwtpostgres.backend.basemodels;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@NoArgsConstructor
public abstract class BaseEntity {
    private Date createdAt;
}
