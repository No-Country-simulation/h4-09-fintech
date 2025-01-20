package com.demo.demo.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUpdateDto {
    private String title;
    private String subtitle;
    private String text;
    private String creationUser;
    private String content;
    private String category;
}