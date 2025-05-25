package ncc.java.opentalk.service;

import ncc.java.opentalk.dto.UserDTO;

import java.util.Date;

public interface JWTService {
    String generateAcessToken(UserDTO dto);
    String generateRefreshToken(UserDTO dto);
    String extractUsername(String token);
    public Date extractExpiration(String token);
    long extractUserId(String token);
}
