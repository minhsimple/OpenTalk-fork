package ncc.java.opentalk.serverHrm.service;

import ncc.java.opentalk.exception.AppException;
import ncc.java.opentalk.serverHrm.model.UserFromHRM;
import ncc.java.opentalk.serverHrm.model.UserHRM;

import java.util.List;

public interface HrmService {
    List<UserFromHRM> findAllUsersFormHRM();

    public List<UserHRM> fetchUsersFromHrm();

    public void syncUsersFromHrm() throws AppException;
}
