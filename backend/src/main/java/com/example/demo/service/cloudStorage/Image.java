package com.example.demo.service.cloudStorage;

import com.example.demo.components.User;
import jakarta.persistence.*;
import lombok.*;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String imageUrl;
    @OneToOne
    private User user;


}