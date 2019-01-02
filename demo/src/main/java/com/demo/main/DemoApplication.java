package com.demo.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpMethod;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableTransactionManagement
@ComponentScan(basePackages= {"com.demo.main"})
@EnableWebMvc
@EnableAutoConfiguration
public class DemoApplication implements WebMvcConfigurer{
	
	public static void main(String[] args) {
		
		SpringApplication.run(DemoApplication.class, args);
	}
	
//	@Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurerAdapter() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/*").allowedOrigins("http://localhost:4200");
//            }
//        };
//    }
	
	
//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//		// TODO Auto-generated method stub
//		WebMvcConfigurer.super.addCorsMappings(registry);
//		registry.addMapping("/**").allowedOrigins("http://localhost:4200").maxAge(3600);
//	}
}
