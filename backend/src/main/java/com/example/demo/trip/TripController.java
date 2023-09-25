package com.example.demo.trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/trips")
public class TripController {
    private final TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }
//    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllTrips")
    public List<Trip> getGetTrips(){
        return tripService.getTrips();
    }

//    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createTrip")
    public ResponseEntity<Trip> registerNewTrip(@RequestBody Trip trip){
        Trip newTrip = tripService.addTrip(trip);
        return ResponseEntity.ok(newTrip);
    }
//
//    @DeleteMapping(path = "{userId}")
//    public void deleteUser(@PathVariable("userId") Long userId) {
//        userService.deleteUser(userId);
//    }
//
//    @PutMapping(path = "{userId}")
//    public void updateUser(
//            @PathVariable("userId") Long userId,
//            @RequestBody (required = false) User userUpdate) {
//        String email = userUpdate.getEmail();
//        String password = userUpdate.getPassword();
//        userService.updateUserDetails(userId, email , password);
//    }
}
