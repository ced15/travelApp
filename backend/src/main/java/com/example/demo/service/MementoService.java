package com.example.demo.service;

import com.example.demo.components.Memento;
import com.example.demo.repository.MementoRepository;
import com.example.demo.components.Trip;
import com.example.demo.repository.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MementoService {
    private final MementoRepository mementoRepository;
    private final TripRepository tripRepository;


    //tested
    public List<Memento> getMementos() {
        return mementoRepository.findAll();
    }

    //tested
    public Memento addMemento(Memento memento) {
        mementoRepository.save(memento);
        System.out.println(memento);
        return memento;
    }

    //tested
    public void deleteMemento(Long mementoId) {
        List<Trip> tripList = tripRepository.findAll();
        Memento memento = mementoRepository.findMementoById(mementoId)
                .orElseThrow(() -> new IllegalStateException("Memento with ID " + mementoId + " does not exist"));
        if (memento != null) {
            for (Trip trip : tripList) {
                for (Memento memento1 : trip.getMementos()) {
                    if (memento1.getId().equals(mementoId)) {
                        trip.getMementos().remove(memento1);
                        tripRepository.save(trip);
                    }
                }
            }
            mementoRepository.delete(memento);
        }
    }

    //tested
    @Transactional
    public void updateMementoDetails(Long mementoId, String mementoMessage, Date alarmDate) {
        Memento memento = mementoRepository.findMementoById(mementoId)
                .orElseThrow(() -> new IllegalStateException("Location with ID " + mementoId + " does not exist"));
            memento.setMementoMessage(mementoMessage);
            memento.setAlarmDate(alarmDate);

        mementoRepository.save(memento);
    }
}
