package com.demo.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class NewsPolygonResponse {
    @JsonProperty("results")
    private List<NewsArticles> results;

    @JsonProperty("status")
    private String status;

    @JsonProperty("request_id")
    private String requestId;

    @JsonProperty("count")
    private int count;

    @JsonProperty("next_url")
    private String nextUrl;

}
