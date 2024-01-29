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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    private final PasswordEncoder passwordEncoder;
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepository.save(user);
    }

    //tested
    public List<User> getUsers() {
        return userRepository.findAll();
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
