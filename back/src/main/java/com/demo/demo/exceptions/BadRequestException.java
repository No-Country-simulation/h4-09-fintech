package com.demo.demo.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadRequestException extends RuntimeException {
    private Integer statusCode = 400;
    public BadRequestException(String message) {
        super(message);
    }
}
