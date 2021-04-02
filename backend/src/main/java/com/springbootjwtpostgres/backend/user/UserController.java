package com.springbootjwtpostgres.backend.user;

import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) throws NotFoundException {
        return new ResponseEntity<>(this.userService.getUser(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(this.userService.createUser(user), HttpStatus.OK);
    }

    @PutMapping("{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody @Valid User newUser) throws NotFoundException {
        return new ResponseEntity<>(this.userService.updateUser(userId, newUser), HttpStatus.OK);
    }

    @DeleteMapping("{/userId}")
    public void deleteUser(@PathVariable Long userId) {
        this.userService.deleteUser(userId);
    }
}
