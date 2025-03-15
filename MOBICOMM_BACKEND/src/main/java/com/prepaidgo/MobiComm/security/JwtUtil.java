package com.prepaidgo.MobiComm.security;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final Key key;

	public JwtUtil(@Value("${jwt.secret}") String secret) {
		this.key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
	}

    public String generateToken(String identifier, String role) {
        return Jwts.builder()
                .setSubject(identifier)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(key , SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractIdentifier(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public String extractRole(String token) {
        return getClaimsFromToken(token).get("role", String.class);
    }

	public boolean isTokenExpired(String token) {
		return getClaimsFromToken(token).getExpiration().before(new Date());
	}

	private Claims getClaimsFromToken(String token) {
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}

}
