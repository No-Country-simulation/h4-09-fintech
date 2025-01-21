package com.demo.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
public class FundsResponse {

    @JsonProperty("records")
    private List<FundProduct> records;

    public List<FundProduct> getRecords() {
        return records;
    }

    public void setRecords(List<FundProduct> records) {
        this.records = records;
    }
}