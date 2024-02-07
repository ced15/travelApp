package com.example.demo.service;

import com.example.demo.components.Location;
import com.example.demo.components.User;
import com.example.demo.repository.LocationRepository;
import com.example.demo.components.Memento;
import com.example.demo.repository.MementoRepository;
import com.example.demo.repository.TripRepository;
import com.example.demo.components.Trip;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final LocationRepository locationRepository;
    private final MementoRepository mementoRepository;


    //tested
    public List<Trip> getTrips() {
        return tripRepository.findAll();
    }

    //tested
    public Trip addTrip(Trip trip, Long user_id) {
        trip.setUser(User.builder().id(user_id).build());
        System.out.println(trip.getLocationList());
        tripRepository.save(trip);
        System.out.println(trip);
        return trip;
    }

    //tested
    public void deleteTripById(Long tripId) {
        Trip trip = tripRepository.findTripById(tripId).orElseThrow(() -> new IllegalStateException("trip with id " + tripId + " does not exist"));
        if (trip != null) {
            List<Memento> mementosToRemove = new ArrayList<>(trip.getMementos());
            for (Memento memento : mementosToRemove) {
                trip.removeMemento(memento);
            }
            tripRepository.save(trip);
        }
        tripRepository.deleteById(tripId);
    }

    public void removeLocationFromTrip(Long tripId, Long locationId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalStateException("trip with id " + tripId + " does not exist"));
        for(Location location : trip.getLocationList()) {
            if (location.getId().equals(locationId)) {
                trip.getLocationList().remove(location);
                tripRepository.save(trip);
            }
        }
    }

    public void removeMementoFromTrip(Long tripId, Long mementoId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalStateException("trip with id " + tripId + " does not exist"));
        for(Memento memento : trip.getMementos()) {
            if (memento.getId().equals(mementoId)) {
                trip.getMementos().remove(memento);
                tripRepository.save(trip);
            }
        }
    }

    @Transactional
    public void addLocationToTrip(Long tripId, Location location) {
        boolean isNotPresentAndNull = false;
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalStateException("trip with id " + tripId + " does not exist"));
        for(Location location1 : trip.getLocationList()) {
            if (location1 == location || location == null) {
                isNotPresentAndNull = true;
                break;
            }
        }
        if(!isNotPresentAndNull) {
            trip.getLocationList().add(location);
            locationRepository.save(location);
        }
    }

//    @Transactional
//    public void addMementoToTrip(Long tripId, Memento memento) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new IllegalStateException("trip with id " + tripId + " does not exist"));
//            trip.getMementos().add(memento);
//            mementoRepository.save(memento);
//    }

    //tested
    @Transactional
    public void editDatesForTrip(Long tripId, LocalDate departureDate, LocalDate arrivalHomeDate) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalStateException("trip with id " + tripId + " does not exist"));
        if (!arrivalHomeDate.equals(trip.getArrivalHomeDate())
                && arrivalHomeDate.isAfter(trip.getDepartureDate())) {
            trip.setArrivalHomeDate(arrivalHomeDate);
            tripRepository.save(trip);
        }
        if (!departureDate.equals(trip.getDepartureDate())
                && departureDate.isBefore(trip.getArrivalHomeDate())) {
            trip.setDepartureDate(departureDate);
            tripRepository.save(trip);
        }
    }

    @Transactional
    public Trip addMementoToTrip(Long memento_id, Trip trip) {
        trip.addMemento(Memento.builder().id(memento_id).build());
        tripRepository.save(trip);
        System.out.println(trip);
        return trip;
    }
}
