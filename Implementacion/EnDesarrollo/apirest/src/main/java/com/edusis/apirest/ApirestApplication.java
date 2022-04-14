package com.edusis.apirest;

import java.util.TimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.edusis.apirest.dao")
public class ApirestApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ApirestApplication.class, args);
        TimeZone.setDefault(TimeZone.getTimeZone("America/Argentina/Cordoba"));
    }
    
}
