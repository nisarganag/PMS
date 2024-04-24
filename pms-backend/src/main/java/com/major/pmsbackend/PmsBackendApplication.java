package com.major.pmsbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@ComponentScan(basePackages = "com.major.pmsbackend")
public class PmsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PmsBackendApplication.class, args);
	}
}