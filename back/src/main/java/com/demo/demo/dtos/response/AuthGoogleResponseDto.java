package com.demo.demo.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthGoogleResponseDto{
    private String token;
    private Boolean firstTime;
}
