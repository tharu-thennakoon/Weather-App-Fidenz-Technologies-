package com.backend.backend.service;

import com.backend.backend.model.WeatherResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class WeatherService {

    @Value("${openweathermap.api.key}")
    private String apiKey;

    private final List<String> activeCityIds = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public WeatherService() {
        loadCitiesFromJson();
    }

    private void loadCitiesFromJson() {
        try {
            ClassPathResource resource = new ClassPathResource("cities.json");
            JsonNode root = objectMapper.readTree(resource.getInputStream());
            JsonNode list = root.get("List");
            
            for (JsonNode city : list) {
                String cityCode = city.get("CityCode").asText();
                activeCityIds.add(cityCode);
            }
        } catch (IOException e) {
            System.err.println("Error loading cities from JSON: " + e.getMessage());
            // Fallback to default cities
            activeCityIds.addAll(Arrays.asList("1248991", "1850147", "2644210"));
        }
    }

    @Cacheable(value = "weatherData", unless = "#result == null")
    public List<WeatherResponse> getWeatherData() throws IOException {
        List<WeatherResponse> responses = new ArrayList<>();

        for (String cityId : activeCityIds) {
            WeatherResponse response = fetchWeather(cityId);
            if (response != null) {
                responses.add(response);
            }
        }

        return responses;
    }

    public WeatherResponse addCity(String cityCode) throws IOException {
        WeatherResponse response = fetchWeather(cityCode);
        if (response != null && !activeCityIds.contains(cityCode)) {
            activeCityIds.add(cityCode);
        }
        return response;
    }

    public void removeCity(String cityCode) {
        activeCityIds.remove(cityCode);
    }

    @Cacheable(value = "weatherData", key = "#cityId")
    private WeatherResponse fetchWeather(String cityId) throws IOException {
        String urlString = String.format(
            "https://api.openweathermap.org/data/2.5/weather?id=%s&appid=%s&units=metric",
            cityId, apiKey
        );

        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(5000);

        try (InputStream inputStream = conn.getInputStream()) {
            JsonNode root = objectMapper.readTree(inputStream);

            WeatherResponse response = new WeatherResponse();
            
            // Basic weather info
            response.setName(root.get("name").asText());
            response.setDescription(root.get("weather").get(0).get("description").asText());
            response.setTemp(root.get("main").get("temp").asDouble());
            
            // Additional weather details
            response.setHumidity(root.get("main").get("humidity").asDouble());
            response.setPressure(root.get("main").get("pressure").asDouble());
            response.setTempMin(root.get("main").get("temp_min").asDouble());
            response.setTempMax(root.get("main").get("temp_max").asDouble());
            
            // Wind information
            response.setWindSpeed(root.get("wind").get("speed").asDouble());
            
            // Visibility
            response.setVisibility(root.get("visibility").asInt());
            
            // Sunrise/Sunset times
            response.setSunrise(root.get("sys").get("sunrise").asLong());
            response.setSunset(root.get("sys").get("sunset").asLong());
            
            // Weather icon
            response.setIcon(root.get("weather").get(0).get("icon").asText());

            return response;
        } catch (Exception e) {
            System.err.println("Error fetching weather for city ID " + cityId + ": " + e.getMessage());
            return null;
        } finally {
            conn.disconnect();
        }
    }
}