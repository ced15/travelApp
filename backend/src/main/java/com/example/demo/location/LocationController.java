package com.example.demo.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/locations")
public class LocationController {
    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }
    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllLocations")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createLocation")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location newLocation = locationService.addLocation(location);
        return ResponseEntity.ok(newLocation);
    }

    //tested
    @DeleteMapping(path = "{locationId}")
    public ResponseEntity<String> deleteLocation(@PathVariable("locationId") Long locationId) {
        locationService.deleteLocation(locationId);
        return ResponseEntity.ok("Location deleted");
    }

    //tested
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
