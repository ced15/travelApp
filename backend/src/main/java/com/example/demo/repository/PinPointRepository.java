package com.example.demo.repository;

import com.example.demo.components.PinPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PinPointRepository extends JpaRepository<PinPoint, Long> {

    Optional<PinPoint> findPinPointById(Long id);

}


