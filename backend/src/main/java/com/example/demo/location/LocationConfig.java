package com.example.demo.location;

import jakarta.transaction.Transactional;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
@Getter
public class LocationConfig implements CommandLineRunner, Ordered {

    LocationRepository locationRepository;

    @Autowired
    public LocationConfig(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        Location location1 = new Location(
                "Type1",
                "Location 1",
                "Address 1",
                false,
                "asd");
        Location location2 = new Location(
                "Type2",
                "Location 2",
                "Address 2",
                true,
                "asd");

        locationRepository.save(location1);
        locationRepository.save(location2);
        System.out.println(location1);
        System.out.println(location2);

    }

    @Override
    public int getOrder() {
        return 2;
    }
}
