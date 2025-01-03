package ncc.java.opentalk.service;

import ncc.java.opentalk.dto.BranchEmployeeCountDTO;
import ncc.java.opentalk.dto.CompanyBranchDTO;
import ncc.java.opentalk.entity.CompanyBranch;
import ncc.java.opentalk.entity.User;

import java.util.List;
import java.util.Optional;

public interface CompanyBranchService {
    List<CompanyBranchDTO> getCompanyBranches();

    CompanyBranchDTO createCompanyBranch(CompanyBranchDTO companyBranch);

    Optional<CompanyBranch> findById(Long id);

    Optional<CompanyBranchDTO> getCompanyBranchById(Long id);

    CompanyBranchDTO updateCompanyBranch(Long companyBranchId, CompanyBranchDTO companyBranchDTO);

    boolean deleteCompanyBranch(Long companyBranchId);

    public List<BranchEmployeeCountDTO> getAllBranchesWithEmployeeCount();

    public void notifyAllEmployee(List<User> users);
}
