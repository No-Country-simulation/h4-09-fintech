package com.demo.demo.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotFoundException extends RuntimeException {
    private Integer statusCode = 404;
    public NotFoundException(String message) {
        super(message);
    }
}
