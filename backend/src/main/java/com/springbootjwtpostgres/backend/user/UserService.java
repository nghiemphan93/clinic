package com.springbootjwtpostgres.backend.user;

import javassist.NotFoundException;
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

    public User getUser(Long userId) throws NotFoundException {
        return this.userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public User createUser(User user) {
        return this.userRepo.save(user);
    }

    public User updateUser(Long userId, User newUser) throws NotFoundException {
        User oldUser = this.userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        oldUser.setEmail(newUser.getEmail());
        oldUser.setUsername(newUser.getUsername());
        oldUser.setPassword(newUser.getPassword());
        oldUser.setRoles(newUser.getRoles());
        return this.userRepo.save(oldUser);
    }

    public void deleteUser(Long userId) {
        this.userRepo.deleteById(userId);
    }
}
