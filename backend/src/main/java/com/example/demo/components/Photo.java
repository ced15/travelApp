package com.example.demo.components;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "\"Photo\"")
@Data
@NoArgsConstructor
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pinPoint.id")
    private PinPoint pinPoint;

    public Photo(Long id, String url, String description) {
        this.id = id;
        this.url = url;
        this.description = description;
    }
}
