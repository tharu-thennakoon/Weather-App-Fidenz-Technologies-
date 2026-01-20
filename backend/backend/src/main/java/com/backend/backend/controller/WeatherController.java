package com.backend.backend.controller;

import com.backend.backend.model.City;
import com.backend.backend.model.WeatherResponse;
import com.backend.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping
    public ResponseEntity<List<WeatherResponse>> getWeather() {
        try {
            List<WeatherResponse> weather = weatherService.getWeatherData();
            return ResponseEntity.ok(weather);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<WeatherResponse> addCity(
            @RequestBody City city, 
            @AuthenticationPrincipal Jwt jwt) {
        try {
            if (jwt == null) {
                return ResponseEntity.status(401).build();
            }
            
            WeatherResponse response = weatherService.addCity(city.getCityCode());
            if (response == null) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{cityId}")
    public ResponseEntity<Void> deleteCity(
            @PathVariable String cityId, 
            @AuthenticationPrincipal Jwt jwt) {
        try {
            if (jwt == null) {
                return ResponseEntity.status(401).build();
            }
            
            weatherService.removeCity(cityId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}