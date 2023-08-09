package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JwtTokenGeneratorImp implements JwtTokenGenerator{
    @Override
    public Map<String, String> generateToken(User user) {
        String jwtToken = null;

        jwtToken = Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"secretkey")
                .compact();
        System.out.println("token is here"+jwtToken);

        Map<String,String> map = new HashMap<>();
        map.put("token",jwtToken);
        map.put("message", "User Successfully logged in");
        return map;
    }
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey("secretkey")
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

}

