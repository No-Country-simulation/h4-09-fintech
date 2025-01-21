package com.demo.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CedearApiResponse {

    @JsonProperty("t")
    private List<BigDecimal> t; // Timestamps

    @JsonProperty("o")
    private List<BigDecimal> o; // Open prices

    @JsonProperty("h")
    private List<BigDecimal> h; // High prices

    @JsonProperty("l")
    private List<BigDecimal> l; // Low prices

    @JsonProperty("c")
    private List<BigDecimal> c; // Close prices

    @JsonProperty("v")
    private List<BigDecimal> v; // Volume

    @JsonProperty("s")
    private String s; // Status
}
