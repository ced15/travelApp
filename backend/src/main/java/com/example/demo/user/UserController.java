package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/account")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllUsers")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createUser")
    public ResponseEntity<User> registerNewUser(@RequestBody User user){
        User newRegisterUser = userService.addUsers(user);
        return ResponseEntity.ok(newRegisterUser);
    }

    //tested
    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    //tested
    @PutMapping(path = "{userId}")
    public void updateUser(
            @PathVariable("userId") Long userId,
            @RequestBody (required = false) User userUpdate) {
        String email = userUpdate.getEmail();
        String password = userUpdate.getPassword();
        userService.updateUserDetails(userId, email , password);
    }
}
