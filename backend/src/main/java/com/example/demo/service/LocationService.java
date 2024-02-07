package com.example.demo.service;

import com.example.demo.components.Location;
import com.example.demo.repository.LocationRepository;
import com.example.demo.components.Trip;
import com.example.demo.repository.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final TripRepository tripRepository;

    //tested
    public List<Location> getLocations() {
        return locationRepository.findAll();
    }

    //tested
    public Location addLocation(Location location) {
        locationRepository.save(location);
        System.out.println(location);
        return location;
    }

    //tested
    public void deleteLocation(Long locationId) {
        Location location = locationRepository.findLocationById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location with ID " + locationId + " does not exist"));

        List<Trip> tripList = tripRepository.findAll();

        if (location != null) {
            for (Trip trip : tripList) {
                for (Location location1 : trip.getLocationList()) {
                    if (location1.getId().equals(locationId)) {
                        trip.getLocationList().remove(location1);
                        tripRepository.save(trip);
                    }
                }
            }
            locationRepository.delete(location);
        }
    }

    //tested
    @Transactional
    public void updateLocationDetails(Long locationId, String locationName, String locationAddress, boolean visited, String notes) {
        Location location = locationRepository.findLocationById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location with ID " + locationId + " does not exist"));
        String existingLocationName = location.getLocationName();
        String existingLocationAddress = location.getLocationAddress();
        String existingNotes = location.getNotes();
        if (locationName != null) {
            location.setLocationName(locationName);
        } else {
            location.setLocationName(existingLocationName);
        }

        if (locationAddress != null) {
            location.setLocationAddress(locationAddress);
        } else {
            location.setLocationAddress(existingLocationAddress);
        }

        location.setVisited(visited);

        if (notes != null) {
            location.setNotes(notes);
        } else {
            location.setNotes(existingNotes);
        }
        locationRepository.save(location);
    }
}
