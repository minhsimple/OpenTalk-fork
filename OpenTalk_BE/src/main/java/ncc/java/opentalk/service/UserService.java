package ncc.java.opentalk.service;

import ncc.java.opentalk.dto.UserDTO;
import ncc.java.opentalk.entity.User;
import ncc.java.opentalk.exception.AppException;
import ncc.java.opentalk.model.request.OpenTalkCompletedRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(User user);

    List<UserDTO> getUsers();

    List<UserDTO> getAllAdmin();

    UserDTO getUserById(Long userId) throws AppException;

    UserDTO updateUser(Long userId, UserDTO dto);

    Optional<UserDTO> getUserByUsername(String username);

    Optional<UserDTO> getUserByUsernameWithNativeQuery(String username);

    Optional<UserDTO> getUserByEmail(String email);

    boolean deleteUser(Long userId);

    Slice<UserDTO> getUnregisteredOpenTalks(OpenTalkCompletedRequest request);

    List<UserDTO> getAvailableUsersTobeHost();

    public void generateRandom();
}
