package ncc.java.opentalk.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ncc.java.opentalk.dto.UserDTO;
import ncc.java.opentalk.entity.CompanyBranch;
import ncc.java.opentalk.entity.User;
import ncc.java.opentalk.exception.AppException;
import ncc.java.opentalk.model.ApiResponse;
import ncc.java.opentalk.model.request.AuthenticationRequest;
import ncc.java.opentalk.model.request.RegisterRequest;
import ncc.java.opentalk.model.response.AuthenticationResponse;
import ncc.java.opentalk.service.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationSerrviceImpl implements AuthenticationService {
    private final UserService userService;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CompanyBranchService companyBranchService;
    private final RedisService redisService;

    @Value("${jwt.refresh-token-expiration}")
    private long expirationOfRefreshToken;

    @Override
    public ApiResponse<AuthenticationResponse> register(RegisterRequest request) {
        User newUser = new User();
        newUser.setFullName(request.getFullname());
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setEmail(request.getEmail());
        CompanyBranch companyBranch = companyBranchService.findById(request.getCompanyBranchId()).orElse(null);
        newUser.setCompanyBranch(companyBranch);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        newUser.setIsEnabled(true);

        UserDTO createdUser = userService.createUser(newUser);

        AuthenticationResponse authenticationResponse =  AuthenticationResponse.builder()
                .userDTO(createdUser)
                .build();
        return ApiResponse.<AuthenticationResponse>builder()
                .message("Register successfully!")
                .result(authenticationResponse)
                .build();
    }

    @Override
    public ApiResponse<AuthenticationResponse> login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        UserDTO dto = userService.getUserByUsername(request.getUsername()).orElse(null);
        if (dto == null) {
            throw new UsernameNotFoundException(request.getUsername());
        }

        String accessToken = jwtService.generateAcessToken(dto);
        String refreshToken = jwtService.generateRefreshToken(dto);

        redisService.saveRefreshToken(dto.getId(), refreshToken, expirationOfRefreshToken);
        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .userDTO(dto)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        return ApiResponse.<AuthenticationResponse>builder()
                .message("Login successfully!")
                .result(authenticationResponse)
                .build();
    }

    @Override
    public ApiResponse<AuthenticationResponse> logout(String accessToken) {
        if (accessToken.startsWith("Bearer")) {
            accessToken = accessToken.substring(7);
        }
        long ttl = (jwtService.extractExpiration(accessToken).getTime()-System.currentTimeMillis())/1000;
        if (ttl > 0) {
            redisService.revokeToken(accessToken, ttl);
        }

        redisService.deleteRefreshToken(jwtService.extractUserId(accessToken));
        return null;
    }

    @Override
    public ApiResponse<AuthenticationResponse> refresh(String refreshToken) throws AppException {
        if (refreshToken.startsWith("Bearer")) {
            refreshToken = refreshToken.substring(7);
        }

        long user_id = jwtService.extractUserId(refreshToken);
        UserDTO dto = userService.getUserById(user_id);

        if (redisService.getRefreshToken(user_id).equals(refreshToken)) {
            String newAccessToken = jwtService.generateAcessToken(dto);
            String newRefreshToken = jwtService.generateRefreshToken(dto);

            redisService.deleteRefreshToken(user_id);
            redisService.saveRefreshToken(user_id, newRefreshToken, expirationOfRefreshToken);

            AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                    .userDTO(dto)
                    .accessToken(newAccessToken)
                    .refreshToken(newRefreshToken)
                    .build();
            return ApiResponse.<AuthenticationResponse>builder()
                    .message("Refresh token successfully!")
                    .result(authenticationResponse)
                    .build();
        }
        return null;
    }
}
