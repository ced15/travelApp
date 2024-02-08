package com.example.demo.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.*;

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
    private Date alarmDate;
    @JsonIgnore
    @ManyToMany(mappedBy = "mementos", fetch = FetchType.EAGER)
    Set<Trip> trips = new HashSet<>();

    public Memento(String mementoMessage, Date alarmDate) {
        this.mementoMessage = mementoMessage;
        this.alarmDate = alarmDate;
    }
}
