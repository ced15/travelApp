package com.example.demo.controller;

import com.example.demo.authentication.ChangePasswordRequest;
import com.example.demo.components.User;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/account")
public class UserController {
    private final UserService userService;

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
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
    @PutMapping(path = "/addTrip/{userId}/{tripId}")
    public ResponseEntity<User> addTripToUser( @PathVariable("userId") Long userId,
                                               @PathVariable("tripId") Long tripId
    ){
        User newRegisterUser = userService.addTripToUser(userId, tripId);
        System.out.println(newRegisterUser);
        return ResponseEntity.ok(newRegisterUser);
    }

}
