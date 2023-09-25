package com.example.demo.location;

import com.example.demo.trip.Trip;
import com.example.demo.trip.TripRepository;
import com.example.demo.user.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Configuration
public class LocationConfig {
    @Bean
    CommandLineRunner commandLineRunner(LocationRepository repository){
        return args -> {
            Location location1 = new Location("Type1", "Location 1", "Address 1", false);
            Location location2 = new Location("Type2", "Location 2", "Address 2", true);
            repository.save(location1);
            repository.save(location2);
        };
    }
}
