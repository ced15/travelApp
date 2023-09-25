package com.example.demo.trip;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;

    @Autowired
    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getTrips() {
        return tripRepository.findAll();
    }

    public Trip addTrip(Trip trip) {
        Optional<Trip> tripOptional = tripRepository.findTripById(trip.getId());
        if(tripOptional.isPresent()) {
            throw new IllegalStateException("trip already exists");
        }
        tripRepository.save(trip);
        System.out.println(trip);
        return trip;
    }
//
//    public void deleteUser(Long userId) {
//        boolean exists = userRepository.existsById(userId);
//        if(!exists) {
//            throw new IllegalStateException("user with id " + userId + " does not exist");
//        }
//        userRepository.deleteById(userId);
//    }
//
//    @Transactional
//    public void updateUserDetails(Long userId, String email, String password) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalStateException("" +
//                        "user with id " + userId + " does not exist"));
//
//        if(email != null && email.length() > 0 && !Objects.equals(user.getEmail(), email)){
//            Optional<User> userOptional = userRepository.findUserByEmail(email);
//            if(userOptional.isPresent()) {
//                throw new IllegalStateException("email taken");
//            }
//            user.setEmail(email);
//        }
//
//        if(password != null && password.length() > 0 && !Objects.equals(user.getPassword(), password)){
//            user.setPassword(password);
//        }
//    }

}
