package com.example.demo.memento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/memento")
public class MementoController {
    private final MementoService mementoService;

    @Autowired
    public MementoController(MementoService mementoService) {
        this.mementoService = mementoService;
    }
    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping(path = "/getAllMementos")
    public List<Memento> getMementos() {
        return mementoService.getMementos();
    }

    //tested
    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping(path = "/createMemento")
    public ResponseEntity<Memento> createMemento(@RequestBody Memento memento) {
        Memento newMemento = mementoService.addMemento(memento);
        return ResponseEntity.ok(newMemento);
    }

    //tested
    @DeleteMapping(path = "{mementoId}")
    public ResponseEntity<String> deleteMemento(@PathVariable("mementoId") Long mementoId) {
        mementoService.deleteMemento(mementoId);
        return ResponseEntity.ok("Memento deleted");

    }

    //tested
    @PutMapping(path = "{mementoId}")
    public void updateMemento(
            @PathVariable("mementoId") Long mementoId,
            @RequestBody(required = false) Memento mementoUpdate) {
        String mementoName = mementoUpdate.getMementoName();
        String mementoMessage = mementoUpdate.getMementoMessage();
        LocalDate alarmDate = mementoUpdate.getAlarmDate();
        mementoService.updateMementoDetails(mementoId, mementoName, mementoMessage, alarmDate);

    }
}
