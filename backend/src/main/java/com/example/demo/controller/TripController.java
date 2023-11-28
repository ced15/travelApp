package com.example.demo.controller;

import com.example.demo.components.Location;
import com.example.demo.components.Memento;
import com.example.demo.components.Trip;
import com.example.demo.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllTrips")
    public List<Trip> getGetTrips(){return tripService.getTrips();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createTrip")
    public ResponseEntity<Trip> registerNewTrip(@RequestBody Trip trip){
        Trip newTrip = tripService.addTrip(trip);
        return ResponseEntity.ok(newTrip);
    }

    //tested
    @PostMapping(path = "/updateLocation/{tripId}")
    public void addLocationToTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody (required = false) Location location) {
        tripService.addLocationToTrip(tripId, location);
    }

    //tested
    @PostMapping(path = "/updateMemento/{tripId}")
    public void addMementoToTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody(required = false) Memento memento) {
        tripService.addMementoToTrip(tripId, memento);
    }

    //tested
    @DeleteMapping(path = "/deleteTrip/{tripId}")
    public ResponseEntity<String> deleteTrip(@PathVariable("tripId") Long tripId) {
        tripService.deleteTripById(tripId);
        return ResponseEntity.ok("Trip was deleted.");
    }

    //tested
    @DeleteMapping(path = "/deleteLocationFromTrip/{tripId}/{locationId}")
    public ResponseEntity<String> deleteLocationFromTrip(
            @PathVariable("tripId") Long tripId,
            @PathVariable("locationId") Long locationId) {
        tripService.removeLocationFromTrip(tripId, locationId);
        return ResponseEntity.ok("Location deleted from trip");
    }

    //tested
    @DeleteMapping(path = "/deleteMementoFromTrip/{tripId}/{mementoId}")
    public ResponseEntity<String> deleteMementoFromTrip(
            @PathVariable("tripId") Long tripId,
            @PathVariable("mementoId") Long mementoId) {
        tripService.removeMementoFromTrip(tripId, mementoId);
        return ResponseEntity.ok("Memento removed from trip");
    }

    //tested
    @PutMapping(path = "{tripId}")
    public void updateDateForTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody(required = false) Trip tripUpdate) {
        LocalDate departureDate = tripUpdate.getDepartureDate();
        LocalDate arrivalDate = tripUpdate.getArrivalHomeDate();
        tripService.editDatesForTrip(tripId, departureDate, arrivalDate);
    }
}
