package com.example.demo.components;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pinPoint_id")
    private PinPoint pinPoint;

    public Photo(Long id, String url, String description) {
        this.id = id;
        this.url = url;
        this.description = description;
    }
}
