package com.example.demo.config;

import com.example.demo.components.Memento;
import com.example.demo.repository.MementoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

import java.time.LocalDate;

@Configuration
@RequiredArgsConstructor
public class MementoConfig implements CommandLineRunner, Ordered {

    private final MementoRepository mementoRepository;


    @Override
    public void run(String... args) throws Exception {
        Memento memento1 = new Memento(
                "Don't forget your glasses",
                LocalDate.now()
        );
        Memento memento2 = new Memento(
                "Don't forget your slippers",
                LocalDate.now()
        );
        mementoRepository.save(memento1);
        mementoRepository.save(memento2);
    }

    @Override
    public int getOrder() {
        return 3;
    }
}
