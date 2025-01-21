package com.demo.demo.services.impl;

import com.demo.demo.models.NewsArticles;
import com.demo.demo.models.NewsPolygonResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.cache.annotation.Cacheable;
import java.util.List;

@Service
public class NewsService {

    private RestTemplate restTemplate;
    private ObjectMapper objectMapper;
    public NewsService( ObjectMapper objectMapper) {
        this.restTemplate = new RestTemplate();
        this.objectMapper = objectMapper;
    }

    @Cacheable(value = "apiCache")
    public List<NewsArticles> getAllNews() {
        String url = "https://api.polygon.io/v2/reference/news?limit=10&apiKey=gM9W3SQOypX22Hm4ss9TCFl6ETczO3Cw";
        String response = restTemplate.getForObject(url, String.class);
        if (response != null) {
            try{

                return objectMapper.readValue(response, NewsPolygonResponse.class).getResults();
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }
}
