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

    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllPinPoints")
    public List<PinPoint> getPinPoints() {
        return pinPointService.getPinPoints();
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createPinPoint")
    public ResponseEntity<PinPoint> addPinPoint(@RequestBody PinPoint pinPoint) {
        PinPoint newPinPoint = pinPointService.addPinPoint(pinPoint);
        return ResponseEntity.ok(newPinPoint);
    }

    @DeleteMapping(path = "{pinPointId}")
    public void deletePinPoint(@PathVariable("pinPointId") Long pinPointId) {
        pinPointService.deletePinPointById(pinPointId);
    }

    @PostMapping(path = "/updatePhotos/{pinPointId}")
    public void addPhotoToPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) Photo photo) {
        pinPointService.addPhotoToPinPoint(pinPointId, photo);
    }

    @PostMapping(path = "/updateVideos/{pinPointId}")
    public void addVideoToPinPoint(
            @PathVariable("pinPointId") Long pinPointId,
            @RequestBody(required = false) Video video) {
        pinPointService.addVideoToPinPoint(pinPointId, video);
    }

//    @PutMapping(path = "{userId}")
//    public void updateUser(
//            @PathVariable("userId") Long userId,
//            @RequestBody (required = false) User userUpdate) {
//        String email = userUpdate.getEmail();
//        String password = userUpdate.getPassword();
//        userService.updateUserDetails(userId, email , password);
//    }
}
