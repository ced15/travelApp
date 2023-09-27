package com.example.demo.location;

import com.example.demo.pinPoint.PinPoint;
import com.example.demo.trip.Trip;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "location")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String type;
    private String locationName;
    private String locationAddress;
    private boolean visited;
    private String notes;
    @JsonIgnore
    @OneToMany(mappedBy = "location", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<PinPoint> pinPoints = new ArrayList<>();
    @ManyToMany(mappedBy = "locationList", fetch = FetchType.EAGER)
    private List<Trip> trips = new ArrayList<>();

    public Location(String type, String locationName, String locationAddress, boolean visited, String notes) {
        this.type = type;
        this.locationName = locationName;
        this.locationAddress = locationAddress;
        this.visited = visited;
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", locationName='" + locationName + '\'' +
                ", locationAddress='" + locationAddress + '\'' +
                ", visited=" + visited +
                ", notes='" + notes + '\'' +
                '}';
    }
}
