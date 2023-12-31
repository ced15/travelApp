package com.example.demo.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "location")
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
    private Set<PinPoint> pinPoints = new HashSet<>();

    @ManyToMany(mappedBy = "locationList", fetch = FetchType.EAGER)
    private Set<Trip> trips = new HashSet<>();

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
