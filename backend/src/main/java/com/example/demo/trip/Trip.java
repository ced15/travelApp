package com.example.demo.trip;

import com.example.demo.location.Location;
import com.example.demo.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
//    @JoinColumn(name = "location_id")
////    @JoinTable(
////            name = "trip_location",
////            joinColumns = @JoinColumn(name = "trip_id"),
////            inverseJoinColumns = @JoinColumn(name = "location_id")
////    )
    private Location locationList;

    private LocalDate departureDate;
    private LocalDate arrivalDate;
    private String message;
    private String event;

    public Trip(User user, Location locationList, LocalDate departureDate, LocalDate arrivalDate, String message, String event) {
        this.user = user;
        this.locationList = locationList;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.message = message;
        this.event = event;
    }
}
