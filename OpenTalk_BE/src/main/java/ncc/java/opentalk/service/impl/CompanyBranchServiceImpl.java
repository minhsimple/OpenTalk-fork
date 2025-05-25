package ncc.java.opentalk.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ncc.java.opentalk.dto.BranchEmployeeCountDTO;
import ncc.java.opentalk.dto.CompanyBranchDTO;
import ncc.java.opentalk.entity.CompanyBranch;
import ncc.java.opentalk.entity.Role;
import ncc.java.opentalk.entity.User;
import ncc.java.opentalk.mapper.CompanyBranchMapper;
import ncc.java.opentalk.repository.CompanyBranchRepository;
import ncc.java.opentalk.repository.UserRepository;
import ncc.java.opentalk.service.CompanyBranchService;
import ncc.java.opentalk.service.NotificationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompanyBranchServiceImpl implements CompanyBranchService {
    private final CompanyBranchRepository companyBranchRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager entityManager;

    @Override
    public List<CompanyBranchDTO> getCompanyBranches() {
        log.info("==========* Start Query *==========");
        List<CompanyBranch> branches = companyBranchRepository.findAllWithUsers();
        log.info("==========* End Query *==========");
        return branches.stream().map(CompanyBranchMapper.INSTANCE::toDto).toList();
    }

    @Override
    public CompanyBranchDTO createCompanyBranch(CompanyBranchDTO companyBranchDTO) {
        CompanyBranch companyBranch = CompanyBranchMapper.INSTANCE.toEntity(companyBranchDTO);

        User user = User.builder()
                .fullName("Test Company Branch")
                .username("test")
                .email("abc@gmail.com")
                .role(new Role(1))
                .password(passwordEncoder.encode("123"))
                .isEnabled(true)
                .build();
        user.setCompanyBranch(companyBranch);

        companyBranch.addUser(user);
        return CompanyBranchMapper.INSTANCE.toDto(companyBranchRepository.save(companyBranch));
    }

    @Override
    public Optional<CompanyBranch> findById(Long id) {
        return companyBranchRepository.findById(id);
    }

    @Override
    public Optional<CompanyBranchDTO> getCompanyBranchById(Long id) {
        return companyBranchRepository.findById(id).map(CompanyBranchMapper.INSTANCE::toDto);
    }

//    @Override
//    @Transactional
//    public CompanyBranchDTO updateCompanyBranch(Long companyBranchId, CompanyBranchDTO companyBranchDTO) {
//        CompanyBranch companyBranch = companyBranchRepository.findById(companyBranchId).get();
//        if (companyBranchDTO.getName() != null) {
//            companyBranch.setName(companyBranchDTO.getName());
//        }
//
//        User user = companyBranch.getUsers().get(0); //Nguyen  v0
//        user.setUsername("Nguyen Van A");
//
//        entityManager.refresh(companyBranch);
//
//        System.out.println(user.getUsername());
//        return CompanyBranchMapper.INSTANCE.toDto(companyBranch);
//
//    }

    @Override
    public CompanyBranchDTO updateCompanyBranch(Long companyBranchId, CompanyBranchDTO companyBranchDTO) {
        CompanyBranch companyBranch = companyBranchRepository.findById(companyBranchId).get();
        if (companyBranchDTO.getName() != null) {
            companyBranch.setName(companyBranchDTO.getName());
        }
        companyBranchRepository.save(companyBranch);

        List<User> users = companyBranch.getUsers();
        log.info(String.valueOf(users.size()));
        log.info("Thread: {}", Thread.currentThread().getName());
        log.info("********** {} ********", companyBranch.getName());
        notifyAllEmployee(users);

        return CompanyBranchMapper.INSTANCE.toDto(companyBranch);

    }

    @Override
    @Transactional
    public boolean deleteCompanyBranch(Long companyBranchId) {
        log.info("==========* Start Company Branch Query *==========");
        CompanyBranch existingCompanyBranch = companyBranchRepository.findById(companyBranchId).orElse(null);
        log.info("==========* End Company Branch Query *==========");

        User user = existingCompanyBranch.getUsers().get(0);
        user.setUsername("Nguyen Van B"); //Nguyen Van -> Nguyen Van A
        userRepository.save(user);

        existingCompanyBranch.setName("ABC"); //ABC
        companyBranchRepository.save(existingCompanyBranch);
        int i = 5/0;
//        if (existingCompanyBranch != null) {
//            log.info("==========* Start *==========");
//            User user = userRepository.findById(45L).orElse(null);
//            System.out.println(user.getFullName());
//            existingCompanyBranch.removeUser(user);
//            for (User users : existingCompanyBranch.getUsers()) {
//                System.out.println(users.getFullName());
//            }
//            companyBranchRepository.save(existingCompanyBranch);
//            log.info("==========* End **==========");
//            companyBranchRepository.delete(existingCompanyBranch);
//            return true;
//        }
        return false;
    }

    @Override
    public List<BranchEmployeeCountDTO> getAllBranchesWithEmployeeCount() {
        log.info("==========* Start *==========");
        List<BranchEmployeeCountDTO> branchEmployeeCountDTOS = companyBranchRepository.findAllBranchesWithEmployeeCount();
        log.info("==========* End *==========");
        return branchEmployeeCountDTOS;
    }

    @Override
    public void notifyAllEmployee(List<User> users) {
        for (User user : users) {
            notificationService.sendNotification(user, "Change information of Company");
        }
    }
}
