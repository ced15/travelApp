package com.example.demo.pinPoint.video;

import com.example.demo.pinPoint.PinPoint;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "\"Video\"")
@Data
@NoArgsConstructor
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pinPoint.id")
    private PinPoint pinPoint;

    public Video(Long id, String url, String description) {
        this.id = id;
        this.url = url;
        this.description = description;
    }
}
