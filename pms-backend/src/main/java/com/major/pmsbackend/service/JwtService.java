package com.major.pmsbackend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@SuppressWarnings("deprecation")
@Service
public class JwtService {

  private static final String SECRET_KEY="ae96c76489dfff68346af9c984a21ee8c11b15de75cb4bc6e9179144d2949a0482d1efcb4818e75d97a88090b3a0590414148407a49c2df12f988a4430d4a079";

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }//OK

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }//OK

  public String generateToken(UserDetails userDetails) {
    return generateToken(new HashMap<>(), userDetails);
  }//OK

  public String generateToken(
      Map<String, Object> extraClaims,
      UserDetails userDetails
  ) {
    return Jwts
    .builder()
    .setClaims(extraClaims)
    .setSubject(userDetails.getUsername())
    .setIssuedAt(new Date(System.currentTimeMillis()))
    .setExpiration(new Date(System.currentTimeMillis()+1000*60*24))
    .signWith(getSignInKey(),SignatureAlgorithm.HS256)
    .compact();
  }//OK

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }//OK

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }//OK

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }//OK

  private Claims extractAllClaims(String token) {
    return Jwts
        .parser()
        .setSigningKey(getSignInKey())
        .build()
        .parseClaimsJws(token)
        .getBody();//OK
  }

  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }//OK
}