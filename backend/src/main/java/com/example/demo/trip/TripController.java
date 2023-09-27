package com.example.demo.trip;

import com.example.demo.location.Location;
import com.example.demo.memento.Memento;
import com.example.demo.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/trips")
public class TripController {
    private final TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllTrips")
    public List<Trip> getGetTrips(){
        return tripService.getTrips();
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createTrip")
    public ResponseEntity<Trip> registerNewTrip(@RequestBody Trip trip){
        Trip newTrip = tripService.addTrip(trip);
        return ResponseEntity.ok(newTrip);
    }

    @PostMapping(path = "/updateLocation/{tripId}")
    public void addLocationToTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody (required = false) Location location) {
        tripService.addLocationToTrip(tripId, location);
    }

    @PostMapping(path = "/updateMemento/{tripId}")
    public void addMementoToTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody (required = false) Memento memento) {
        tripService.addMementoToTrip(tripId, memento);
    }

    @DeleteMapping(path = "/deleteTrip/{tripId}")
    public void deleteUser(@PathVariable("tripId") Long tripId) {
        tripService.deleteTripById(tripId);
    }

    @DeleteMapping(path = "/deleteLocationFromTrip/{tripId}/{locationId}")
    public ResponseEntity<String> deleteLocationFromTrip(
                                       @PathVariable("tripId") Long tripId,
                                       @PathVariable("locationId") Long locationId) {
        tripService.removeLocationFromTrip(tripId, locationId);
        return ResponseEntity.ok("Location deleted from trip");
    }

    @DeleteMapping(path = "/deleteMementoFromTrip/{tripId}/{mementoId}")
    public ResponseEntity<String> deleteMementoFromTrip(
                                    @PathVariable("tripId") Long tripId,
                                    @PathVariable("mementoId") Long mementoId) {
        tripService.removeMementoFromTrip(tripId, mementoId);
        return ResponseEntity.ok("Memento removed from trip");
    }

    @PutMapping(path = "{tripId}")
    public void updateTrip(
            @PathVariable("tripId") Long tripId,
            @RequestBody (required = false) Trip tripUpdate) {
        LocalDate departureDate = tripUpdate.getDepartureDate();
        LocalDate arrivalDate = tripUpdate.getArrivalDate();
        tripService.editDatesForTrip(tripId, departureDate , arrivalDate);
    }
}
