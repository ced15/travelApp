package com.example.demo.memento;

import com.example.demo.trip.Trip;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MementoService {
    private final MementoRepository mementoRepository;
    private final TripRepository tripRepository;

    @Autowired
    public MementoService(MementoRepository mementoRepository, TripRepository tripRepository) {
        this.mementoRepository = mementoRepository;
        this.tripRepository = tripRepository;
    }

    public List<Memento> getMementos() {
        return mementoRepository.findAll();
    }

    public Memento addMemento(Memento memento) {
        Optional<Memento> mementoOptional = mementoRepository.findMementoById(memento.getId());
        if (mementoOptional.isPresent()) {
            throw new IllegalStateException("location already exist in your trip");
        }
        mementoRepository.save(memento);
        System.out.println(memento);
        return memento;
    }

    public void deleteMemento(Long mementoId) {
        List<Trip> tripList = tripRepository.findAll();
        Memento memento = mementoRepository.findMementoById(mementoId)
                .orElseThrow(() -> new IllegalStateException("Memento with ID " + mementoId + " does not exist"));
        if (memento != null) {
            for (Trip trip : tripList) {
                for (Memento memento1 : trip.getMementos()) {
                    if (memento1.getId().equals(mementoId)) {
                        trip.getMementos().remove(memento1);
                        System.out.println(trip.getMementos() + "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                        tripRepository.save(trip);
                    }
                }
            }
            mementoRepository.delete(memento);
        }
    }

    @Transactional
    public void updateMementoDetails(Long mementoId, String mementoName, String mementoMessage, LocalDate alarmDate) {
        Memento memento = mementoRepository.findMementoById(mementoId)
                .orElseThrow(() -> new IllegalStateException("Location with ID " + mementoId + " does not exist"));
        String existingMementoName = memento.getMementoName();
        String existingMementoMessage = memento.getMementoMessage();
        LocalDate existingAlarmDate = memento.getAlarmDate();

        if (mementoName != null) {
            memento.setMementoName(mementoName);
        } else {
            memento.setMementoName(existingMementoName);
        }

        if (mementoMessage != null) {
            memento.setMementoMessage(mementoMessage);
        } else {
            memento.setMementoMessage(existingMementoMessage);
        }

        if (alarmDate != null) {
            memento.setAlarmDate(alarmDate);
        } else {
            memento.setAlarmDate(existingAlarmDate);
        }

        mementoRepository.save(memento);
    }
}
