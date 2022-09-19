package com.example.datego;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import javax.swing.*;

@SpringBootApplication
public class DategoApplication {
	public static final String APPLICATION_LOCATIONS = "spring.config.location="
			+ "classpath:application.properties,"
			+ "classpath:aws.yml,"
			+ "classpath:oauth.yml";

	public static void main(String[] args) {
		new SpringApplicationBuilder(DategoApplication.class)
				.properties(APPLICATION_LOCATIONS)
				.run(args);
	}

}
