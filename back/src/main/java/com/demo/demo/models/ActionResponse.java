package com.demo.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;


@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class ActionResponse {
    @JsonProperty("symbol")
    private String symbol;

    @JsonProperty("description")
    private String description;

    // Constructor vacío (necesario para Jackson)
    public ActionResponse() {}
}
