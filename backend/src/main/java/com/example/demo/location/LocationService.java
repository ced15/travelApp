package com.example.demo.location;

import com.example.demo.trip.Trip;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final TripRepository tripRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository, TripRepository tripRepository) {
        this.locationRepository = locationRepository;
        this.tripRepository = tripRepository;
    }
    //tested
    public List<Location> getLocations() {
        return locationRepository.findAll();
    }

    //tested
    public Location addLocation(Location location) {
        Optional<Location> locationOptional = locationRepository.findLocationById(location.getId());
        if (locationOptional.isPresent()) {
            throw new IllegalStateException("location already exist in your trip");
        }
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
    public void updateLocationDetails(Long locationId, String type, String locationName, String locationAddress, boolean visited, String notes) {
        Location location = locationRepository.findLocationById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location with ID " + locationId + " does not exist"));
        String existingLocationName = location.getLocationName();
        String existingType = location.getType();
        String existingLocationAddress = location.getLocationAddress();
        String existingNotes = location.getNotes();
        if (locationName != null) {
            location.setLocationName(locationName);
        } else {
            location.setLocationName(existingLocationName);
        }

        if (type != null) {
            location.setType(type);
        } else {
            location.setType(existingType);
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
