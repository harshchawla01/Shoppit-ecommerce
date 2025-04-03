package com.shoppit.ecommerce.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Map;

@Component
public class JwtUtil {
    @Autowired
    private JwtDecoder jwtDecoder;

    public String extractUsernameFromJwtString(String jwt) {
        try {
            // Split JWT into header, payload, and signature
            String[] parts = jwt.split("\\.");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid JWT token");
            }

            // Decode the payload (second part)
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));

            // Convert payload to JSON object
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> claims = mapper.readValue(payload, Map.class);

            // Extract and return the username
            return (String) claims.get("preferred_username");
        } catch (Exception e) {
            System.err.println("Error decoding JWT: " + e.getMessage());
            return null;
        }
    }
}