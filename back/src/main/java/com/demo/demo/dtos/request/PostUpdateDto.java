package com.demo.demo.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUpdateDto {
    private String title;
    private String content;
    private String category;
}