package com.dreamteam.app.recaptcha;

import lombok.Data;

@Data
public class RecaptchaResponseType {
    private boolean success;
    private String challenge_ts;
    private String hostname;
}
