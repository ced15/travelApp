package com.example.demo.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.source.util.Trees;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "_user_id")
    private User user;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "trip_location",
            joinColumns = @JoinColumn(name = "trip_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    private Set<Location> locationList = new LinkedHashSet<>();
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
    private Set<Memento> mementos = new HashSet<>();

    public Trip(User user, Set<Location> locationList, LocalDate departureDate, LocalDate arrivalHomeDate, String event, Set<Memento> mementos) {
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Trip trip = (Trip) o;
        return Objects.equals(id, trip.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
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
