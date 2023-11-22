package com.example.demo.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "memento")
@Data
@NoArgsConstructor
public class Memento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String mementoName;
    private String mementoMessage;
    private LocalDate alarmDate;
    @JsonIgnore
    @ManyToMany(mappedBy = "mementos", fetch = FetchType.EAGER)
    List<Trip> trips = new ArrayList<>();

    public Memento(String mementoName, String mementoMessage, LocalDate alarmDate) {
        this.mementoName = mementoName;
        this.mementoMessage = mementoMessage;
        this.alarmDate = alarmDate;
    }
}
