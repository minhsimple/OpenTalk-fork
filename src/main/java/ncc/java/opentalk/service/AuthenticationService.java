package ncc.java.opentalk.service;

import ncc.java.opentalk.exception.AppException;
import ncc.java.opentalk.model.ApiResponse;
import ncc.java.opentalk.model.request.AuthenticationRequest;
import ncc.java.opentalk.model.response.AuthenticationResponse;
import ncc.java.opentalk.model.request.RegisterRequest;

public interface AuthenticationService {
        ApiResponse<AuthenticationResponse> register(RegisterRequest request);
        ApiResponse<AuthenticationResponse> login(AuthenticationRequest authenticationRequest);
        ApiResponse<AuthenticationResponse> logout(String accessToken);
        ApiResponse<AuthenticationResponse> refresh(String refreshToken) throws AppException;
}
