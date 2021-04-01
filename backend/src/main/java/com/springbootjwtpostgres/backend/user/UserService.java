package com.springbootjwtpostgres.backend.user;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserCriteriaRepo userCriteriaRepo;

    public UserService(UserRepository userRepository, UserCriteriaRepo userCriteriaRepo) {
        this.userRepository = userRepository;
        this.userCriteriaRepo = userCriteriaRepo;
    }

    public Page<User> getUsers(UserPage userPage,
                               UserSearchCriteria userSearchCriteria) {
        return this.userCriteriaRepo.findAllWithFilters(userPage, userSearchCriteria);
    }

    public User createUser(User user) {
        return this.userRepository.save(user);
    }
}
