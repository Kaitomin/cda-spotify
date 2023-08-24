package com.dreamteam.app.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("prod")
@Configuration
public class CloudinaryConfig {
    @Value("${spring.cloudinary.cloud.name}") String name;
    @Value("${spring.cloudinary.api.key}") String key;
    @Value("${spring.cloudinary.api.secret}") String secret;
    @Bean
    public Cloudinary getCloudinary(){
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", name,
                "api_key", key,
                "api_secret", secret,
                "secure", true));
    }
}
