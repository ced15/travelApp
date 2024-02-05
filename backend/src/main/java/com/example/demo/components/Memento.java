package com.example.demo.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "memento")
public class Memento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String mementoMessage;
    private LocalDate alarmDate;
    @JsonIgnore
    @ManyToMany(mappedBy = "mementos", fetch = FetchType.EAGER)
    Set<Trip> trips = new HashSet<>();

    public Memento(String mementoMessage, LocalDate alarmDate) {
        this.mementoMessage = mementoMessage;
        this.alarmDate = alarmDate;
    }
}
