package com.example.demo.controller;

import com.example.demo.components.Location;
import com.example.demo.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(path = "/getAllLocations")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/createLocation")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location newLocation = locationService.addLocation(location);
        return ResponseEntity.ok(newLocation);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "{locationId}")
    public ResponseEntity<String> deleteLocation(@PathVariable("locationId") Long locationId) {
        locationService.deleteLocation(locationId);
        return ResponseEntity.ok("Location deleted");
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping(path = "{locationId}")
    public ResponseEntity<String> updateLocation(
            @PathVariable("locationId") Long locationId,
            @RequestBody(required = false) Location locationUpdate) {
        String locationName = locationUpdate.getLocationName();
        String type = locationUpdate.getType();
        String locationAddress = locationUpdate.getLocationAddress();
        Boolean visited = locationUpdate.isVisited();
        String notes = locationUpdate.getNotes();
        locationService.updateLocationDetails(locationId, type, locationName, locationAddress, visited, notes);
        return ResponseEntity.ok("Location successfully updated");
    }
}
