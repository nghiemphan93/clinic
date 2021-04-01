package com.springbootjwtpostgres.backend.user;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<User>> getUsers(UserPage userPage,
                                               UserSearchCriteria userSearchCriteria) {
        return new ResponseEntity<>(this.userService.getUsers(userPage, userSearchCriteria), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(this.userService.createUser(user), HttpStatus.OK);
    }
}
