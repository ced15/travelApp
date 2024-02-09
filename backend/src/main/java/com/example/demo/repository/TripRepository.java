package com.example.demo.repository;

import com.example.demo.components.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    Optional<Trip> findTripById(Long id);
    Trip findTripByUser_Id(Long id);

}


