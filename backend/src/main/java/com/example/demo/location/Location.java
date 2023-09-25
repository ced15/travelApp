package com.example.demo.location;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "\"location\"")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String type;
    private String locationName;
    private String locationAddress;
    private boolean visited;

    public Location(String type, String locationName, String locationAddress, boolean visited) {
        this.type = type;
        this.locationName = locationName;
        this.locationAddress = locationAddress;
        this.visited = visited;
    }
}
