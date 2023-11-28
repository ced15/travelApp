package com.example.demo.config;

import com.example.demo.components.Location;
import com.example.demo.repository.LocationRepository;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
@Getter
@RequiredArgsConstructor
public class LocationConfig implements CommandLineRunner, Ordered {

    private final LocationRepository locationRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        Location location1 = new Location(
                "Restaurant",
                "La calul alb",
                "Timisoara",
                true,
                "Best cuisine");
        Location location2 = new Location(
                "Lake",
                "Ochiul Beiului lake",
                "Cheile Nerei",
                true,
                "Beautiful view");

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
