package com.example.demo.pinPoint;

import com.example.demo.location.Location;
import com.example.demo.location.LocationRepository;
import com.example.demo.memento.Memento;
import com.example.demo.memento.MementoRepository;
import com.example.demo.pinPoint.photo.Photo;
import com.example.demo.pinPoint.video.Video;
import com.example.demo.trip.Trip;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PinPointService {

    private final LocationRepository locationRepository;
    private final PinPointRepository pinPointRepository;

    @Autowired
    public PinPointService(LocationRepository locationRepository, PinPointRepository pinPointRepository) {
        this.locationRepository = locationRepository;
        this.pinPointRepository = pinPointRepository;
    }

    public List<PinPoint> getPinPoints() {
        return pinPointRepository.findAll();
    }

    public PinPoint addPinPoint(PinPoint pinPoint) {
        Optional<PinPoint> pinPointOptional = pinPointRepository.findPinPointById(pinPoint.getId());
        if(pinPointOptional.isPresent()) {
            throw new IllegalStateException("Pin Point already exists");
        }
        Location location = locationRepository.findLocationByLocationName(pinPoint.getLocation().getLocationName()).orElse(null);
        pinPoint.setLocation(location);
        pinPointRepository.save(pinPoint);
        return pinPoint;
    }

    public void deletePinPointById(Long pinPointId) {
        PinPoint pinPoint = pinPointRepository.findPinPointById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("PinPoint with ID " + pinPointId + " does not exist"));

        List<Location> locationList = locationRepository.findAll();

        if (pinPoint != null) {
            for (Location location : locationList) {
                for(PinPoint pinPoint1 : location.getPinPoints()) {
                    if(pinPoint1.getId().equals(pinPointId)) {
                        location.getPinPoints().remove(pinPoint1);
                        locationRepository.save(location);
                    }
                }
            }
            pinPointRepository.delete(pinPoint);
        }
    }

    @Transactional
    public void addPhotoToPinPoint(Long pinPointId, Photo photo) {
        PinPoint pinPoint = pinPointRepository.findById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("Pin Point with id " + pinPointId + " does not exist"));
        pinPoint.getPhotos().add(photo);
        pinPointRepository.save(pinPoint);
    }

    @Transactional
    public void addVideoToPinPoint(Long pinPointId, Video video) {
        PinPoint pinPoint = pinPointRepository.findById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("Pin Point with id " + pinPointId + " does not exist"));
        pinPoint.getVideos().add(video);
        pinPointRepository.save(pinPoint);
    }

//    @Transactional
//    public void editDatesForTrip(Long tripId, LocalDate departureDate, LocalDate arrivalDate) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new IllegalStateException("trip with id " + tripId + " does not exist"));
//        if(!departureDate.equals(trip.getDepartureDate())
//                && departureDate.isAfter(trip.getArrivalDate())) {
//            trip.setDepartureDate(departureDate);
//        }
//        if(!arrivalDate.equals(trip.getArrivalDate())
//                && arrivalDate.isBefore(trip.getDepartureDate())) {
//            trip.setArrivalDate(arrivalDate);
//        }
//        tripRepository.save(trip);
//    }

}
