package com.example.demo.config;

import com.example.demo.components.Location;
import com.example.demo.repository.LocationRepository;
import com.example.demo.components.Memento;
import com.example.demo.repository.MementoRepository;
import com.example.demo.components.Trip;
import com.example.demo.repository.TripRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class TripConfig implements CommandLineRunner, Ordered {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final MementoRepository mementoRepository;


    @Override
    public void run(String... args) throws Exception {
        Location location1 = locationRepository.findLocationByLocationName("La calul alb").orElse(null);
        Location location2 = locationRepository.findLocationByLocationName("Ochiul Beiului lake").orElse(null);
        Memento memento1 = mementoRepository.findMementoById(1L).orElse(null);
        Memento memento2 = mementoRepository.findMementoById(2L).orElse(null);

        Trip trip = new Trip(
                userRepository.findUserById(1L),
                Set.of(location1, location2),
                Date.valueOf(LocalDate.now()),
                Date.valueOf(LocalDate.now().plusDays(7)),
                "Road trip",
                Set.of(memento1, memento2)
        );
        Trip trip1 = new Trip(
                userRepository.findUserById(2L),
                Set.of(location1, location2),
                Date.valueOf(LocalDate.now()),
                Date.valueOf(LocalDate.now().plusDays(7)),
                "Vacanta de vara",
                Set.of(memento1, memento2)
        );
        Trip trip2 = new Trip(
                userRepository.findUserById(3L),
                Set.of(location1, location2),
                Date.valueOf(LocalDate.now()),
                Date.valueOf(LocalDate.now().plusDays(7)),
                "Vacanta de vara",
                Set.of(memento1, memento2)
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
