package com.example.demo.trip;

import com.example.demo.location.Location;
import com.example.demo.location.LocationConfig;
import com.example.demo.location.LocationRepository;
import com.example.demo.user.UserConfig;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class TripConfig implements CommandLineRunner, Ordered {

    TripRepository tripRepository;
    UserRepository userRepository;
    LocationRepository locationRepository;

    @Autowired
    public TripConfig(LocationRepository locationRepository, UserRepository userRepository, TripRepository tripRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        Trip trip = new Trip(
                userRepository.findUserById(1L),
                locationRepository.findLocationByLocationName("Location 1"),
                LocalDate.now(),
                LocalDate.now().plusDays(7),
                "Trip Message",
                "Trip Event");
        Trip trip1 = new Trip(
                userRepository.findUserById(2L),
                locationRepository.findLocationByLocationName("Location 2"),
                LocalDate.now(),
                LocalDate.now().plusDays(7),
                "Vacanta la munte",
                "Vacanta de vara"
        );
        Trip trip2 = new Trip(
                userRepository.findUserById(3L),
                locationRepository.findLocationByLocationName("Location 3"),
                LocalDate.now(),
                LocalDate.now().plusDays(7),
                "Vacanta la munte",
                "Vacanta de vara"
        );

        tripRepository.save(trip);
        tripRepository.save(trip1);
        tripRepository.save(trip2);
        System.out.println(trip);
        System.out.println(trip1);
        System.out.println(trip2);
    }

    @Override
    public int getOrder() {
        return 3;
    }
}
