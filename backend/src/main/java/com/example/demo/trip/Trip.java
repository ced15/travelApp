package com.example.demo.trip;

import com.example.demo.location.Location;
import com.example.demo.memento.Memento;
import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trip")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "trip_location",
            joinColumns = @JoinColumn(name = "trip_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    private List<Location> locationList = new ArrayList<>();
    private LocalDate departureDate;
    private LocalDate arrivalHomeDate;
    private String event;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "trip_memento",
            joinColumns = @JoinColumn(name = "trip_id"),
            inverseJoinColumns = @JoinColumn(name = "memento_id")
    )
    private List<Memento> mementos = new ArrayList<>();

    public Trip(User user, List<Location> locationList, LocalDate departureDate, LocalDate arrivalHomeDate, String event, List<Memento> mementos) {
        this.user = user;
        this.locationList = locationList;
        this.departureDate = departureDate;
        this.arrivalHomeDate = arrivalHomeDate;
        this.event = event;
        this.mementos = mementos;
    }

    public void removeMemento(Memento memento) {
        mementos.remove(memento);
        memento.getTrips().remove(this);
    }

    @Override
    public String toString() {
        return "Trip{" +
                "id=" + id +
                ", locationList=" + locationList +
                ", departureDate=" + departureDate +
                ", arrivalDate=" + arrivalHomeDate +
                ", event='" + event + '\'' +
                '}';
    }
}
