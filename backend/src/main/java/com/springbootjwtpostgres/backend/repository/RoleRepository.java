package com.springbootjwtpostgres.backend.repository;

import com.springbootjwtpostgres.backend.models.ERole;
import com.springbootjwtpostgres.backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRole(ERole role);
}
