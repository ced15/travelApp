package com.example.demo.controller;

import com.example.demo.components.PinPoint;
import com.example.demo.service.PinPointService;
import com.example.demo.components.Photo;
import com.example.demo.components.Video;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/PinPoint")
@RequiredArgsConstructor
public class PinPointController {
    private final PinPointService pinPointService;

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(path = "/getAllPinPoints")
    public List<PinPoint> getPinPoints() {
        return pinPointService.getPinPoints();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/createPinPoint")
    public ResponseEntity<PinPoint> addPinPoint(@RequestBody PinPoint pinPoint) {
        PinPoint newPinPoint = pinPointService.addPinPoint(pinPoint);
        return ResponseEntity.ok(newPinPoint);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "{pinPointId}")
    public ResponseEntity<String> deletePinPoint(@PathVariable("pinPointId") Long pinPointId) {
        pinPointService.deletePinPointById(pinPointId);
        return ResponseEntity.ok("Pin point deleted");
    }
    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "/deletePhotoFromPinPoint/{pinPointId}/{photoId}")
    public ResponseEntity<String> deletePhotoFromPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @PathVariable("photoId") Long photoId) {
        pinPointService.removePhotoFromPinPoint(pinPointId, photoId);
        return ResponseEntity.ok("Photo deleted from Pin Point");
    }
    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "/deleteVideoFromPinPoint/{pinPointId}/{videoId}")
    public ResponseEntity<String> deleteVideoFromPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @PathVariable("videoId") Long videoId) {
        pinPointService.removeVideoFromPinPoint(pinPointId, videoId);
        return ResponseEntity.ok("Video deleted from Pin Point");
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/updatePhotos/{pinPointId}")
    public ResponseEntity<String> addPhotoToPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) Photo photo) {
        pinPointService.addPhotoToPinPoint(pinPointId, photo);
        return ResponseEntity.ok("Photo added successfully");
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/updateVideos/{pinPointId}")
    public ResponseEntity<String> addVideoToPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) Video video) {
        pinPointService.addVideoToPinPoint(pinPointId, video);
        return ResponseEntity.ok("Video added successfully");
    }
    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping(path = "{pinPointId}")
    public ResponseEntity<String> updateNotesForPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) PinPoint pinPointUpdate) {
        String notes = pinPointUpdate.getNotes();
        pinPointService.updatePinPointDetails(pinPointId, notes);
        return ResponseEntity.ok("Pin Point updated");
    }
}
