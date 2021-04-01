package com.springbootjwtpostgres.backend.config;

import com.springbootjwtpostgres.backend.user.ERole;
import com.springbootjwtpostgres.backend.user.Role;
import com.springbootjwtpostgres.backend.user.RoleRepository;
import com.springbootjwtpostgres.backend.user.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {
    private final RoleRepository roleRepository;

    public DataLoader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<Role> roles = this.roleRepository.findAll();
        if (roles.isEmpty()) {
            Role admin = new Role();
            admin.setRole(ERole.ROLE_ADMIN);
            Role mod = new Role();
            mod.setRole(ERole.ROLE_MODERATOR);
            Role user = new Role();
            user.setRole(ERole.ROLE_USER);
            roles.add(admin);
            roles.add(mod);
            roles.add(user);
            this.roleRepository.saveAll(roles);
        }
    }
}
