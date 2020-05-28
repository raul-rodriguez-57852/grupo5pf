package com.edusis.apirest;

import java.util.TimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApirestApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApirestApplication.class, args);
        TimeZone.setDefault(TimeZone.getTimeZone("America/Argentina/Cordoba"));
    }

}
