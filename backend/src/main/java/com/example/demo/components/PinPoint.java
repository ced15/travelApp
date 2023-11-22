package com.example.demo.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "\"pin_point\"")
@Data
@NoArgsConstructor
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
    private List<Photo> photos;
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER)
    private List<Video> videos;

    public PinPoint(Long id,
                    Location location,
                    String notes, List<Photo> photos, List<Video> videos) {
        this.id = id;
        this.location = location;
        this.notes = notes;
        this.photos = photos;
        this.videos = videos;
    }
}
