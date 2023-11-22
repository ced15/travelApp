package com.example.demo.controller;

import com.example.demo.components.User;
import com.example.demo.service.UserService;
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
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/getAllUsers")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    //tested
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/createUser")
    public ResponseEntity<User> registerNewUser(@RequestBody User user){
        User newRegisterUser = userService.addUsers(user);
        return ResponseEntity.ok(newRegisterUser);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173/*")
    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173/*")
    @PutMapping(path = "{userId}")
    public void updateUser(
            @PathVariable("userId") Long userId,
            @RequestBody(required = false) User userUpdate) {
        String email = userUpdate.getEmail();
        String password = userUpdate.getPassword();
        userService.updateUserDetails(userId, email, password);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path = "/login/{email}/{password}")
    public ResponseEntity<User> login(
            @PathVariable("email") String email,
            @PathVariable("password") String password) {
        System.out.println(email+" "+password);
        return ResponseEntity.ok(userService.getUserLogin(email, password));
    }
}
