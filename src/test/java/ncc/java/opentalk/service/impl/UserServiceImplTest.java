package ncc.java.opentalk.service.impl;

import ncc.java.opentalk.dto.UserDTO;
import ncc.java.opentalk.entity.Role;
import ncc.java.opentalk.entity.User;
import ncc.java.opentalk.repository.RoleRepository;
import ncc.java.opentalk.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_ShouldCreateUserSuccessfully() {
        User user = new User();
        user.setFullName("Test User");

        Role role = new Role();
        role.setId(2L);
        role.setName("USER");

        when(roleRepository.findById(2L)).thenReturn(Optional.of(role));
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserDTO result = userService.createUser(user);

        assertNotNull(result);
        verify(roleRepository, times(1)).findById(2L);
        verify(userRepository, times(1)).save(user);
    }

}