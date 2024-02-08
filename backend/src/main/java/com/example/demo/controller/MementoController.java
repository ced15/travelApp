package com.example.demo.controller;

import com.example.demo.components.Memento;
import com.example.demo.service.MementoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/memento")
public class MementoController {
    private final MementoService mementoService;

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(path = "/getAllMementos")
    public List<Memento> getMementos() {
        return mementoService.getMementos();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/createMemento")
    public ResponseEntity<Memento> createMemento(@RequestBody Memento memento) {
        Memento newMemento = mementoService.addMemento(memento);
        return ResponseEntity.ok(newMemento);
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "{mementoId}")
    public ResponseEntity<String> deleteMemento(@PathVariable("mementoId") Long mementoId) {
        mementoService.deleteMemento(mementoId);
        return ResponseEntity.ok("Memento deleted");
    }

    //tested
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping(path = "{mementoId}")
    public List<String> updateMemento(
            @PathVariable("mementoId") Long mementoId,
            @RequestBody(required = false) Memento mementoUpdate) {
        String mementoMessage = mementoUpdate.getMementoMessage();
        Date alarmDate = mementoUpdate.getAlarmDate();
        mementoService.updateMementoDetails(mementoId, mementoMessage, alarmDate);
        return List.of("Memento updated");
    }
}
