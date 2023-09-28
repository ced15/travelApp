package com.example.demo.pinPoint;

import com.example.demo.pinPoint.photo.Photo;
import com.example.demo.pinPoint.video.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/PinPoint")
public class PinPointController {
    private final PinPointService pinPointService;

    @Autowired
    public PinPointController(PinPointService pinPointService) {
        this.pinPointService = pinPointService;
    }

    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllPinPoints")
    public List<PinPoint> getPinPoints() {
        return pinPointService.getPinPoints();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createPinPoint")
    public ResponseEntity<PinPoint> addPinPoint(@RequestBody PinPoint pinPoint) {
        PinPoint newPinPoint = pinPointService.addPinPoint(pinPoint);
        return ResponseEntity.ok(newPinPoint);
    }

    //tested
    @DeleteMapping(path = "{pinPointId}")
    public ResponseEntity<String> deletePinPoint(@PathVariable("pinPointId") Long pinPointId) {
        pinPointService.deletePinPointById(pinPointId);
        return ResponseEntity.ok("Pin point deleted");
    }
    //tested
    @DeleteMapping(path = "/deletePhotoFromPinPoint/{pinPointId}/{photoId}")
    public ResponseEntity<String> deletePhotoFromPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @PathVariable("photoId") Long photoId) {
        pinPointService.removePhotoFromPinPoint(pinPointId, photoId);
        return ResponseEntity.ok("Photo deleted from Pin Point");
    }
    //tested
    @DeleteMapping(path = "/deleteVideoFromPinPoint/{pinPointId}/{videoId}")
    public ResponseEntity<String> deleteVideoFromPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @PathVariable("videoId") Long videoId) {
        pinPointService.removeVideoFromPinPoint(pinPointId, videoId);
        return ResponseEntity.ok("Video deleted from Pin Point");
    }

    //tested
    @PostMapping(path = "/updatePhotos/{pinPointId}")
    public ResponseEntity<String> addPhotoToPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) Photo photo) {
        pinPointService.addPhotoToPinPoint(pinPointId, photo);
        return ResponseEntity.ok("Photo added successfully");
    }

    //tested
    @PostMapping(path = "/updateVideos/{pinPointId}")
    public ResponseEntity<String> addVideoToPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) Video video) {
        pinPointService.addVideoToPinPoint(pinPointId, video);
        return ResponseEntity.ok("Video added successfully");
    }
    //tested
    @PutMapping(path = "{pinPointId}")
    public ResponseEntity<String> updateNotesForPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) PinPoint pinPointUpdate) {
        String notes = pinPointUpdate.getNotes();
        pinPointService.updatePinPointDetails(pinPointId, notes);
        return ResponseEntity.ok("Pin Point updated");
    }
}
