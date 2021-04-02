package com.springbootjwtpostgres.backend.user;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final UserCriteriaRepo userCriteriaRepo;

    public UserService(UserRepo userRepo, UserCriteriaRepo userCriteriaRepo) {
        this.userRepo = userRepo;
        this.userCriteriaRepo = userCriteriaRepo;
    }

    public Page<User> getUsers(UserPage userPage,
                               UserSearchCriteria userSearchCriteria) {
        return this.userCriteriaRepo.findAllWithFilters(userPage, userSearchCriteria);
    }

    public User createUser(User user) {
        return this.userRepo.save(user);
    }
}
