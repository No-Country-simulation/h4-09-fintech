package com.demo.demo.services.api;

import com.demo.demo.dtos.cedears.api.CedearsResponce;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class APICedears {
    private final String url = "https://analisistecnico.com.ar/services/datafeed/history?symbol=AMAT:CEDEAR&resolution=D&from=1735700400&to=1737393959";

    public CedearsResponce findCedears() {
        RestTemplate template = new RestTemplate();
        return template.getForObject(url , CedearsResponce.class);
    }
}
