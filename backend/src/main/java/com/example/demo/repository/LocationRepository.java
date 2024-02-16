package com.example.demo.repository;

import com.example.demo.components.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findLocationById(Long locationId);

    Optional<Location> findLocationByLocationName(String locationName);

    @Modifying
    @Query("DELETE FROM Location l WHERE l.id = :locationId")
    void deleteLocationAndAssociations(Long locationId);
}

