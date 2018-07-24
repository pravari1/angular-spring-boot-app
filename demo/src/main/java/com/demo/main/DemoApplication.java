package com.demo.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableTransactionManagement
@ComponentScan(basePackages= {"com.demo.main"})
@EnableWebMvc
@EnableAutoConfiguration
public class DemoApplication {
	
	public static void main(String[] args) {
		
		SpringApplication.run(DemoApplication.class, args);
	}
}
