package com.dreamteam.app;

import com.dreamteam.app.storage.StorageProperties;
import com.dreamteam.app.storage.StorageLocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

import java.util.Arrays;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class AppApplication {
	@Autowired
	Environment env;

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner init(StorageLocalService storageService) {
		return (args) -> {
			System.out.println("Storage init");
			//storageService.deleteAll();
			storageService.init();
		};
	}

	@Bean
	ApplicationRunner applicationRunner(Environment environment) {
		System.out.println("Current environment : " + Arrays.stream(env.getActiveProfiles()).toList());
		System.out.println(env.getProperty("frontend_url"));
		return args -> System.out.println("message from application.properties " + environment.getProperty("message-from-application-properties"));
	}
}
