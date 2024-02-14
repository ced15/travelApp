package com.example.demo.service;

import com.example.demo.authentication.ChangePasswordRequest;
import com.example.demo.components.Memento;
import com.example.demo.repository.UserRepository;
import com.example.demo.components.Trip;
import com.example.demo.repository.TripRepository;
import com.example.demo.components.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    private final PasswordEncoder passwordEncoder;
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        if (connectedUser != null && connectedUser instanceof UsernamePasswordAuthenticationToken) {
            var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));

            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Connected user not found or invalid authentication token");
        }
//
//        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
//            throw new IllegalStateException("Wrong password");
//        }
//        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
//            throw new IllegalStateException("Password are not the same");
//        }


    }

    //tested
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Set<Trip> getUserTrips(Long id){
        return userRepository.findUserById(id).getTrips();
    }

    //tested
    public User addUsers(User user) {
        Optional<User> userOptional = userRepository.findUserByEmail(user.getEmail());
        if(userOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        userRepository.save(user);
        System.out.println(user);
        return user;
    }

    //tested
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with ID " + userId + " does not exist"));
        if (user != null) {
            for (Trip trip : user.getTrips()) {
                List<Memento> mementosToRemove = new ArrayList<>(trip.getMementos());
                for (Memento memento : mementosToRemove) {
                    trip.removeMemento(memento);
                }
                tripRepository.delete(trip);
            }
            userRepository.delete(user);
        }
    }

    //tested
    @Transactional
    public void updateUserDetails(Long userId, String email, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("" +
                        "user with id " + userId + " does not exist"));

        if(email != null && email.length() > 0 && !Objects.equals(user.getEmail(), email)){
            Optional<User> userOptional = userRepository.findUserByEmail(email);
            if(userOptional.isPresent()) {
                throw new IllegalStateException("email taken");
            }
            user.setEmail(email);
        }

        if(password != null && password.length() > 0 && !Objects.equals(user.getPassword(), password)){
            user.setPassword(password);
        }
    }
    @Transactional
    public User addTripToUser(Long userId, Long tripId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("" +
                        "user with id " + userId + " does not exist"));
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalStateException("" +
                        "trip with id " + tripId + " does not exist"));
        user.getTrips().add(trip);
        userRepository.save(user);
        trip.setUser(user);
        tripRepository.save(trip);
        return user;
    }


}
