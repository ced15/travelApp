package com.example.demo.config;

import com.example.demo.components.Role;
import com.example.demo.components.Trip;
import com.example.demo.components.User;
import com.example.demo.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

import java.util.LinkedHashSet;

@Getter
@Configuration
@RequiredArgsConstructor
public class UserConfig implements CommandLineRunner, Ordered {

    private final UserRepository userRepository;
    private final ApplicationConfig passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        User Paul = User.builder()
                .firstName("Paul")
                .lastName("Costea")
                .email("costeapaul@yahoo.com")
                .password(passwordEncoder.passwordEncoder().encode("12345"))
                .role(Role.USER)
                .build();

        User Denisa = User.builder()
                .firstName("Denisa")
                .lastName("Cuta")
                .email("denisa1506@yahoo.com")
                .password(passwordEncoder.passwordEncoder().encode("123456"))
                .role(Role.USER)
                .build();

        User George = User.builder()
                .firstName("George")
                .lastName("Mihai")
                .email("georgemihai@yahoo.com")
                .password(passwordEncoder.passwordEncoder().encode("1234567"))
                .role(Role.USER)
                .build();

        userRepository.save(Paul);
        userRepository.save(Denisa);
        userRepository.save(George);
        System.out.println(Paul);
        System.out.println(Denisa);
        System.out.println(George);

    }

    @Override
    public int getOrder() {
        return 1;
    }
}
