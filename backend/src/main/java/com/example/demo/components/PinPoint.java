package com.example.demo.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "pin_point")
public class PinPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
//    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    private Location location;
    private String notes;
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER)
    private Set<Photo> photos = new LinkedHashSet<>();
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER)
    private Set<Video> videos = new LinkedHashSet<>();
}
