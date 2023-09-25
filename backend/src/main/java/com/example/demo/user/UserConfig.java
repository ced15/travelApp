package com.example.demo.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
            User Paul = new User(
                    "Paul",
                    "Costea",
                    "123@yahoo.com",
                    "12345"
            );
            User Denisa = new User(
                    "Denisa",
                    "Cuta",
                    "1234@yahoo.com",
                    "123456"
            );
            User George = new User(
                    "George",
                    "Mihai",
                    "12345@yahoo.com",
                    "1234567"
            );
            repository.save(Paul);
            repository.save(Denisa);
            repository.save(George);
        };
    }
}
