package com.example.demo.service.cloudStorage;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageUrlRepository extends JpaRepository<Image, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Image r SET r.imageUrl = :newImageUrl WHERE r.id = :id")
    void updateImageById(Long id, String newImageUrl);

}


