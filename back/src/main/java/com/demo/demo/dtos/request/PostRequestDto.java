package com.demo.demo.dtos.request;

import java.time.LocalDateTime;


public record PostRequestDto(String title, String Content, LocalDateTime creationDate,String category) {
}
