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
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    private final LocationService locationService;
    //tested
    @GetMapping(path = "/getAllTrips")
    public List<Trip> getGetTrips(){return tripService.getTrips();
    }

    //tested
    @PostMapping(path = "/createTrip/{user_id}")
    public ResponseEntity<Trip> registerNewTrip(@PathVariable Long user_id, @RequestBody Trip trip){
        System.out.println(trip);
        System.out.println(trip.getMementos());
        Trip newTrip = tripService.addTrip(trip, user_id);
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
    @PostMapping(path = "/updateMemento/{mementoId}")
    public ResponseEntity<Trip> addMementoToTrip(
            @PathVariable Long mementoId,
            @RequestBody Trip trip) {
        Trip newTrip = tripService.addMementoToTrip(mementoId, trip);
        return ResponseEntity.ok(newTrip);
    }

    //tested
    @DeleteMapping(path = "/deleteTrip/{tripId}")
    public ResponseEntity<String> deleteTrip(@PathVariable("tripId") Long tripId) {
        tripService.deleteTripById(tripId);
        return ResponseEntity.ok("Trip was deleted.");
    }

    //tested
    @DeleteMapping(path = "/deleteLocationFromTrip/{tripId}/{locationId}")
    public List<String> deleteLocationFromTrip(
            @PathVariable("tripId") Long tripId,
            @PathVariable("locationId") Long locationId) {
        tripService.removeLocationFromTrip(tripId, locationId);
        return List.of("Location deleted from trip");
    }

    //tested
    @DeleteMapping(path = "/deleteMementoFromTrip/{tripId}/{mementoId}")
    public ResponseEntity<String> deleteMementoFromTrip(
            @PathVariable("tripId") Long tripId,
            @PathVariable("mementoId") Long mementoId) {
        tripService.removeMementoFromTrip(tripId, mementoId);
        return ResponseEntity.ok("Memento removed from trip");
    }

    @PutMapping(path = "/updateTrip/{tripId}")
    public List<String> updateTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody(required = false) Trip tripUpdate) {
        Set<Location> locations = tripUpdate.getLocationList();
        Date departureDate = tripUpdate.getDepartureDate();
        Date arrivalDate = tripUpdate.getArrivalHomeDate();
        String event = tripUpdate.getEvent();
        Set<Memento> mementos = tripUpdate.getMementos();
        tripService.updateTrip(tripId, locations, departureDate, arrivalDate, event, mementos);
        return List.of("Trip successfully updated");
    }
}
