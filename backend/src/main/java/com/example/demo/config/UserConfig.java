package com.example.demo.config;

import com.example.demo.components.Role;
import com.example.demo.components.User;
import com.example.demo.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Service;

@Getter
@Configuration
@RequiredArgsConstructor
public class UserConfig implements CommandLineRunner, Ordered {

    private final UserRepository userRepository;
    private final ApplicationConfig passwordEncoder;
    private User Paul;
    private User Denisa;
    private User George;

    @Override
    public void run(String... args) throws Exception {

        Paul = new User(
                "Paul",
                "Costea",
                "costeapaul@yahoo.com",
                "12345"
        );
        Denisa = new User(
                "Denisa",
                "Cuta",
                "denisa1506@yahoo.com",
                "123456"
        );
        George = new User(
                "George",
                "Mihai",
                "georgemihai@yahoo.com",
                "1234567"
        );
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
