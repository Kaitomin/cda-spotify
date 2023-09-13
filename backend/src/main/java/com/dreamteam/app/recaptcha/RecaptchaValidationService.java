package com.dreamteam.app.recaptcha;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service

public class RecaptchaValidationService {
    @Value("${spring.recaptcha.secret.key}") String RECAPTCHA_SECRET;
    RestTemplate restTemplate = new RestTemplate();

    public boolean isValidCaptcha(String captcha) {
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=" + RECAPTCHA_SECRET + "&response=" + captcha;
        String completeUrl = url + params;
        RecaptchaResponseType resp = restTemplate.postForObject(completeUrl, null, RecaptchaResponseType.class);
        return resp.isSuccess();
    }
}
