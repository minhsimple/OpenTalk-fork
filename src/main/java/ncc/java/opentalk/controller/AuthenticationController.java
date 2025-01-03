package ncc.java.opentalk.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ncc.java.opentalk.dto.UserDTO;
import ncc.java.opentalk.exception.AppException;
import ncc.java.opentalk.model.ApiResponse;
import ncc.java.opentalk.model.request.AuthenticationRequest;
import ncc.java.opentalk.model.response.AuthenticationResponse;
import ncc.java.opentalk.model.request.RegisterRequest;
import ncc.java.opentalk.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        ApiResponse<AuthenticationResponse> response = authenticationService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(@RequestBody AuthenticationRequest authenticationRequest) {
        ApiResponse<AuthenticationResponse> response = authenticationService.login(authenticationRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthenticationResponse> logout(@RequestHeader("Authorization") String accessToken) {
        authenticationService.logout(accessToken);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> refresh(@RequestHeader("Authorization") String refreshToken) throws AppException {
        ApiResponse<AuthenticationResponse> response = authenticationService.refresh(refreshToken);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
