package com.example.demo.controller;
import com.example.demo.service.cloudStorage.ImageService;

import com.example.demo.authentication.ChangePasswordRequest;
import com.example.demo.components.Trip;
import com.example.demo.components.User;
import com.example.demo.service.UserService;
import com.example.demo.service.cloudStorage.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/**")
@RequestMapping(path = "/account")
public class UserController {

    private final UserService userService;
    private final ImageService imageService;
    @PatchMapping(path = "/changePassword")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser,
              @RequestHeader("Authorization") String authorizationHeader
    ) {
        System.out.println("Connected user: " + connectedUser);
        try {
            userService.changePassword(request, connectedUser);
            return ResponseEntity.ok("Password was changed.");
        } catch (Exception e) {
            System.out.println("Error changing password:"+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error changing password: " + e.getMessage());
        }
    }
    @GetMapping(path = "/getTrips/{id}")
    public Set<Trip> getTripsByUser(@PathVariable("id") Long id){
        return userService.getUserTrips(id);
    }
    //tested
    @GetMapping(path = "/getAllUsers")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    //tested
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
    @PostMapping(path= "/addAvatar/{user_id}")
    public ResponseEntity<Image> addImage(@PathVariable Long user_id, @RequestBody MultipartFile image){
        try {
            Image imageObj = imageService.uploadImage(image);
            userService.addImage(user_id, imageObj);
            return ResponseEntity.ok(imageObj);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
