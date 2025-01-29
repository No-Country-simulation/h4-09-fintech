package com.demo.demo.controllers;


import com.demo.demo.models.NewsArticles;
import com.demo.demo.models.NewsPolygonResponse;
import com.demo.demo.services.impl.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;
    @GetMapping
    public ResponseEntity<List<NewsArticles>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }
}
