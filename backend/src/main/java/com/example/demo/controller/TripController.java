package com.example.demo.controller;

import com.example.demo.components.Location;
import com.example.demo.components.Memento;
import com.example.demo.components.Trip;
import com.example.demo.service.LocationService;
import com.example.demo.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    private final LocationService locationService;
    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(path = "/getAllTrips")
    public List<Trip> getGetTrips(){return tripService.getTrips();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/createTrip/{user_id}")
    public ResponseEntity<Trip> registerNewTrip(@PathVariable Long user_id, @RequestBody Trip trip){
        System.out.println(trip);
        System.out.println(trip.getMementos());
        Trip newTrip = tripService.addTrip(trip, user_id);
        return ResponseEntity.ok(newTrip);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/updateLocation/{tripId}")
    public void addLocationToTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody (required = false) Location location) {
        tripService.addLocationToTrip(tripId, location);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/updateMemento/{mementoId}")
    public ResponseEntity<Trip> addMementoToTrip(
            @PathVariable Long mementoId,
            @RequestBody Trip trip) {
        Trip newTrip = tripService.addMementoToTrip(mementoId, trip);
        return ResponseEntity.ok(newTrip);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "/deleteTrip/{tripId}")
    public ResponseEntity<String> deleteTrip(@PathVariable("tripId") Long tripId) {
        tripService.deleteTripById(tripId);
        return ResponseEntity.ok("Trip was deleted.");
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "/deleteLocationFromTrip/{tripId}/{locationId}")
    public ResponseEntity<String> deleteLocationFromTrip(
            @PathVariable("tripId") Long tripId,
            @PathVariable("locationId") Long locationId) {
        tripService.removeLocationFromTrip(tripId, locationId);
        locationService.deleteLocation(locationId);
        return ResponseEntity.ok("Location deleted from trip");
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "/deleteMementoFromTrip/{tripId}/{mementoId}")
    public ResponseEntity<String> deleteMementoFromTrip(
            @PathVariable("tripId") Long tripId,
            @PathVariable("mementoId") Long mementoId) {
        tripService.removeMementoFromTrip(tripId, mementoId);
        return ResponseEntity.ok("Memento removed from trip");
    }


}
