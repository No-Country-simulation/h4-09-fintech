package com.demo.demo.dtos.cedears.api;

import java.util.List;

public record CedearsResponce(
        List<Double> t, // timestamps
        List<Double> o, // open prices
        List<Double> h, // high prices
        List<Double> l, // low prices
        List<Double> c, // close prices
        List<Integer> v, // volumes
        String s // status (e.g. "ok")
) {
}
