package com.example.demo.service;

import com.example.demo.components.Location;
import com.example.demo.components.PinPoint;
import com.example.demo.repository.LocationRepository;
import com.example.demo.components.Photo;
import com.example.demo.repository.PhotoRepository;
import com.example.demo.components.Video;
import com.example.demo.repository.VideoRepository;
import com.example.demo.repository.PinPointRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PinPointService {

    private final LocationRepository locationRepository;
    private final PinPointRepository pinPointRepository;
    private final PhotoRepository photoRepository;
    private final VideoRepository videoRepository;

    //tested
    public List<PinPoint> getPinPoints() {
        return pinPointRepository.findAll();
    }

    //tested
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

    //tested
    public void deletePinPointById(Long pinPointId) {
        PinPoint pinPoint = pinPointRepository.findPinPointById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("PinPoint with ID " + pinPointId + " does not exist"));

        List<Location> locationList = locationRepository.findAll();
        if (pinPoint != null) {
            for (Location location : locationList) {
                for(PinPoint pinPoint1 : location.getPinPoints()) {
                    if(pinPoint1.getId().equals(pinPointId)) {
                        location.getPinPoints().remove(pinPoint1);
                        break;
                    }
                }
                locationRepository.save(location);
            }
            pinPointRepository.delete(pinPoint);
        }
    }

    //tested
    @Transactional
    public void addPhotoToPinPoint(Long pinPointId, Photo photo) {
        PinPoint pinPoint = pinPointRepository.findById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("Pin Point with id " + pinPointId + " does not exist"));
        pinPoint.getPhotos().add(photo);
        photoRepository.save(photo);
        pinPointRepository.save(pinPoint);
    }

    //tested
    @Transactional
    public void addVideoToPinPoint(Long pinPointId, Video video) {
        PinPoint pinPoint = pinPointRepository.findById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("Pin Point with id " + pinPointId + " does not exist"));
        pinPoint.getVideos().add(video);
        videoRepository.save(video);
        pinPointRepository.save(pinPoint);
    }
    //tested
    public void removePhotoFromPinPoint(Long pinPointId, Long photoId) {
        PinPoint pinPoint = pinPointRepository.findById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("Pin Point with id " + pinPointId + " does not exist"));
        for (Photo photo : pinPoint.getPhotos()) {
            if (photo.getId().equals(photoId)) {
                pinPoint.getPhotos().remove(photo);
                pinPointRepository.save(pinPoint);
                break;
            }
        }
    }
    //tested
    public void removeVideoFromPinPoint(Long pinPointId, Long videoId) {
        PinPoint pinPoint = pinPointRepository.findById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("Pin Point with id " + pinPointId + " does not exist"));
        for (Video video : pinPoint.getVideos()) {
            if (video.getId().equals(videoId)) {
                pinPoint.getPhotos().remove(video);
                pinPointRepository.save(pinPoint);
                break;
            }
        }
    }
    //tested
    @Transactional
    public void updatePinPointDetails(Long pinPointId, String pinPointNotes) {
        PinPoint pinPoint = pinPointRepository.findPinPointById(pinPointId)
                .orElseThrow(() -> new IllegalStateException("PinPoint with ID " + pinPointId + " does not exist"));
        String existingPinPointNotes = pinPoint.getNotes();

        if (pinPointNotes != null) {
            pinPoint.setNotes(pinPointNotes);
        } else {
            pinPoint.setNotes(existingPinPointNotes);
        }
        pinPointRepository.save(pinPoint);
    }
}
