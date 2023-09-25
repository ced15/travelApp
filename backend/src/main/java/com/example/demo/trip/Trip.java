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
@Table(name = "\"trip\"")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private User user;
    @OneToMany
    private List<Location> location;
    private LocalDate departureDate;
    private LocalDate arrivalDate;
    private String message;
    private String event;

    Trip(User user, List<Location> location, LocalDate departureDate, LocalDate arrivalDate, String message, String event) {
        this.user = user;
        this.location = location;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.message = message;
        this.event = event;
    }
}
