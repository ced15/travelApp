package com.example.demo.controller;

import com.example.demo.components.Location;
import com.example.demo.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "/locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;


    //tested
    @GetMapping(path = "/getAllLocations")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    //tested
    @PostMapping(path = "/createLocation")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location newLocation = locationService.addLocation(location);
        return ResponseEntity.ok(newLocation);
    }

    //tested
    @DeleteMapping(path = "{locationId}")
    public List<String> deleteLocation(@PathVariable("locationId") Long locationId) {
        locationService.deleteLocation(locationId);
        return List.of("Location deleted");
    }

    //tested
    @PutMapping(path = "{locationId}")
    public ResponseEntity<String> updateLocation(
            @PathVariable("locationId") Long locationId,
            @RequestBody(required = false) Location locationUpdate) {
        String locationName = locationUpdate.getLocationName();
        String locationAddress = locationUpdate.getLocationAddress();
        Boolean visited = locationUpdate.isVisited();
        String notes = locationUpdate.getNotes();
        locationService.updateLocationDetails(locationId, locationName, locationAddress, visited, notes);
        return ResponseEntity.ok("Location successfully updated");
    }
}
