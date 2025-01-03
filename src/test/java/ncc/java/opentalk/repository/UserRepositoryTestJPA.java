package ncc.java.opentalk.repository;

import jakarta.transaction.Transactional;
import ncc.java.opentalk.entity.CompanyBranch;
import ncc.java.opentalk.entity.Role;
import ncc.java.opentalk.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTestJPA {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void testFindByEmail() {
        User user = new User();
        user.setFullName("John Doe");
        user.setUsername("john.doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("123");

        CompanyBranch companyBranch = new CompanyBranch();
        companyBranch.setId(1L);
        user.setCompanyBranch(companyBranch);

        Role role = new Role();
        role.setId(2L);
        user.setRole(role);

        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByEmail("john.doe@example.com");

        assertTrue(foundUser.isPresent(), "User should be found");
        assertEquals("John Doe", foundUser.get().getFullName(), "User's full name should match");
    }
}
