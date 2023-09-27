package com.example.demo.trip;

import com.example.demo.location.Location;
import com.example.demo.location.LocationRepository;
import com.example.demo.location.LocationService;
import com.example.demo.memento.Memento;
import com.example.demo.memento.MementoRepository;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Configuration
public class TripConfig implements CommandLineRunner, Ordered {

    TripRepository tripRepository;
    UserRepository userRepository;
    LocationRepository locationRepository;
    MementoRepository mementoRepository;

    @Autowired
    public TripConfig(LocationRepository locationRepository, UserRepository userRepository, TripRepository tripRepository, MementoRepository mementoRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
        this.mementoRepository = mementoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Location location1 = locationRepository.findLocationByLocationName("Location 1").orElse(null);
        Location location2 = locationRepository.findLocationByLocationName("Location 2").orElse(null);
         Memento memento1 = mementoRepository.findMementoById(1L).orElse(null);
        Memento memento2 = mementoRepository.findMementoById(2L).orElse(null);

        System.out.println(location1 + "++++++++++++++++++++++++++++++++++++");

        Trip trip = new Trip(
                userRepository.findUserById(1L),
                List.of(location1, location2),
                LocalDate.now(),
                LocalDate.now().plusDays(7),
                "Trip Event",
                List.of(memento1, memento2)
        );
        Trip trip1 = new Trip(
                userRepository.findUserById(2L),
                List.of(location1, location2),
                LocalDate.now(),
                LocalDate.now().plusDays(7),
                "Vacanta de vara",
                List.of(memento1, memento2)
        );
        Trip trip2 = new Trip(
                userRepository.findUserById(3L),
                List.of(location1, location2),
                LocalDate.now(),
                LocalDate.now().plusDays(7),
                "Vacanta de vara",
                List.of(memento1, memento2)
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
        return 4;
    }
}
