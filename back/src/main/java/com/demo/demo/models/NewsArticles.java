package com.demo.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class NewsArticles {
    @JsonProperty("id")
    private String id;

    @JsonProperty("publisher")
    private Publisher publisher;

    @JsonProperty("title")
    private String title;

    @JsonProperty("author")
    private String author;

    @JsonProperty("published_utc")
    private String publishedUtc;

    @JsonProperty("article_url")
    private String articleUrl;

    @JsonProperty("tickers")
    private List<String> tickers;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("description")
    private String description;

    @JsonProperty("keywords")
    private List<String> keywords;

    @JsonProperty("insights")
    private List<Insight> insights;

    // Getters y setters

    @Getter
    @Setter
    public static class Publisher {
        @JsonProperty("name")
        private String name;

        @JsonProperty("homepage_url")
        private String homepageUrl;

        @JsonProperty("logo_url")
        private String logoUrl;

        @JsonProperty("favicon_url")
        private String faviconUrl;
    }
    @Getter
    @Setter
    public static class Insight {

        @JsonProperty("ticker")
        private String ticker;

        @JsonProperty("sentiment")
        private String sentiment;

        @JsonProperty("sentiment_reasoning")
        private String sentimentReasoning;

        // Getters y setters

    }
}
