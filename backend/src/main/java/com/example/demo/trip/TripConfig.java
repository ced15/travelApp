package com.example.demo.trip;

import com.example.demo.location.Location;
import com.example.demo.user.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Configuration
public class TripConfig {
    @Bean
    CommandLineRunner commandLineRunner(TripRepository tripRepository){
        return args -> {
            Location location1 = new Location("Type1", "Location 1", "Address 1", false);
            Location location2 = new Location("Type2", "Location 2", "Address 2", true);
            List<Location> locations = Arrays.asList(location1, location2);
            User Paul = new User(
                    "Paul",
                    "Costea",
                    "123@yahoo.com",
                    "12345"
            );
            User Denisa = new User(
                    "Denisa",
                    "Cuta",
                    "1234@yahoo.com",
                    "123456"
            );
            User George = new User(
                    "George",
                    "Mihai",
                    "12345@yahoo.com",
                    "1234567"
            );

            Trip trip = new Trip(
                    Paul,
                    locations,
                    LocalDate.now(),
                    LocalDate.now().plusDays(7),
                    "Trip Message",
                    "Trip Event");
            Trip trip1 = new Trip(
                    Denisa,
                    locations,
                    LocalDate.now(),
                    LocalDate.now().plusDays(7),
                    "Vacanta la munte",
                    "Vacanta de vara"
            );
            Trip trip2 = new Trip(
                    George,
                    locations,
                    LocalDate.now(),
                    LocalDate.now().plusDays(7),
                    "Vacanta la munte",
                    "Vacanta de vara"
            );
            tripRepository.save(trip);
            tripRepository.save(trip1);
            tripRepository.save(trip2);
        };
    }
}
