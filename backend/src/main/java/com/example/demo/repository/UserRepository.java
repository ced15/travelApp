package com.example.demo.repository;

import com.example.demo.components.User;

import com.example.demo.service.cloudStorage.Image;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(String email);
    Optional<User> findByEmail(String email);
    User findUserById(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.avatar = :avatar WHERE u.id =:id")
    void updateAvatarById(Long id, Image avatar);

}


