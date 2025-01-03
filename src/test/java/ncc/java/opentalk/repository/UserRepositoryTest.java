package ncc.java.opentalk.repository;

import ncc.java.opentalk.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class UserRepositoryTest {

    @Test
    public void testFindByEmailUsingMockitoMock() {
        UserRepository mockRepository = Mockito.mock(UserRepository.class);

        User mockUser = new User();
        mockUser.setFullName("John Doe");
        mockUser.setEmail("john.doe@example.com");
        when(mockRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(mockUser));

        Optional<User> foundUser = mockRepository.findByEmail("john.doe@example.com");

        assertTrue(foundUser.isPresent());
        assertEquals("John Doe", foundUser.get().getFullName());
        verify(mockRepository, times(1)).findByEmail("john.doe@example.com");
    }
}