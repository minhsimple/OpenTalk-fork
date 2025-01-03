package ncc.java.opentalk.service.impl;

import ncc.java.opentalk.dto.UserDTO;
import ncc.java.opentalk.entity.CompanyBranch;
import ncc.java.opentalk.entity.User;
import ncc.java.opentalk.model.ApiResponse;
import ncc.java.opentalk.model.request.RegisterRequest;
import ncc.java.opentalk.model.response.AuthenticationResponse;
import ncc.java.opentalk.service.CompanyBranchService;
import ncc.java.opentalk.service.JWTService;
import ncc.java.opentalk.service.RedisService;
import ncc.java.opentalk.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class AuthenticationSerrviceImplTest {


    private AuthenticationSerrviceImpl authenticationService;

    @Mock
    private UserService userService;

    @Mock
    private JWTService jwtService;

    @Mock
    private RedisService redisService;

    @Mock
    private CompanyBranchService companyBranchService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        authenticationService = new AuthenticationSerrviceImpl(
                userService,
                jwtService,
                passwordEncoder,
                null,
                companyBranchService,
                redisService
        );
    }

    @Test
    public void testRegister() {
        RegisterRequest request = new RegisterRequest();
        request.setFullname("John Doe");
        request.setUsername("johndoe");
        request.setPassword("password123");
        request.setEmail("john.doe@example.com");
        request.setCompanyBranchId(1L);

        CompanyBranch mockCompanyBranch = new CompanyBranch();
        mockCompanyBranch.setId(1L);

        UserDTO mockUserDTO = new UserDTO();
        mockUserDTO.setFullName("John Doe");
        mockUserDTO.setEmail("john.doe@example.com");

        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword123");
        when(companyBranchService.findById(request.getCompanyBranchId())).thenReturn(Optional.of(mockCompanyBranch));
        when(userService.createUser(any(User.class))).thenReturn(mockUserDTO);

        ApiResponse<AuthenticationResponse> response = authenticationService.register(request);

        assertNotNull(response);
        assertEquals("Register successfully!", response.getMessage());
        assertNotNull(response.getResult());
        assertEquals("John Doe", response.getResult().getUserDTO().getFullName());
        assertEquals("john.doe@example.com", response.getResult().getUserDTO().getEmail());

        verify(passwordEncoder, times(1)).encode("password123");
        verify(companyBranchService, times(1)).findById(1L);
        verify(userService, times(1)).createUser(any(User.class));
    }
}