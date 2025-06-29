package ncc.java.opentalk.controller;

import lombok.RequiredArgsConstructor;
import ncc.java.opentalk.dto.BranchEmployeeCountDTO;
import ncc.java.opentalk.dto.CompanyBranchDTO;
import ncc.java.opentalk.service.CompanyBranchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-branch")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class CompanyBranchController {
    private final CompanyBranchService companyBranchService;

    @GetMapping
    public ResponseEntity<List<CompanyBranchDTO>> getCompanyBranchs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<CompanyBranchDTO> dtos = companyBranchService.getCompanyBranches(page, size);
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<CompanyBranchDTO> createCompanyBranch(@RequestBody CompanyBranchDTO dto) {
        CompanyBranchDTO createdDto = companyBranchService.createCompanyBranch(dto);
        return ResponseEntity.ok(createdDto);
    }

    @PutMapping("/{companyBranchId}")
    public ResponseEntity<CompanyBranchDTO> updateCompanyBranch(@PathVariable Long companyBranchId, @RequestBody CompanyBranchDTO dto) {
        CompanyBranchDTO updatedDto = companyBranchService.updateCompanyBranch(companyBranchId, dto);
        return ResponseEntity.ok(updatedDto);
    }

    @DeleteMapping("/{companyBranchId}")
    public ResponseEntity<CompanyBranchDTO> deleteCompanyBranch(@PathVariable Long companyBranchId) {
//        CompanyBranch companyBranch = companyBranchService.findById(companyBranchId).get();
//        System.out.println(companyBranch.getUsers().get(1).getFullName());
        return companyBranchService.deleteCompanyBranch(companyBranchId) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/employee-count")
    public List<BranchEmployeeCountDTO> getBranchesWithEmployeeCount() {
        return companyBranchService.getAllBranchesWithEmployeeCount();
    }
}
