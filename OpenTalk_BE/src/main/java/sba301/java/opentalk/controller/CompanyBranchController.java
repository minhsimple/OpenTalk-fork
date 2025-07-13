package sba301.java.opentalk.controller;

import lombok.RequiredArgsConstructor;
import sba301.java.opentalk.dto.BranchEmployeeCountDTO;
import sba301.java.opentalk.dto.CompanyBranchDTO;
import sba301.java.opentalk.service.CompanyBranchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-branch")
@RequiredArgsConstructor
public class CompanyBranchController {
    private final CompanyBranchService companyBranchService;

    @GetMapping
    public ResponseEntity<List<CompanyBranchDTO>> getCompanyBranchs(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
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
        return companyBranchService.deleteCompanyBranch(companyBranchId) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/employee-count")
    public List<BranchEmployeeCountDTO> getBranchesWithEmployeeCount() {
        return companyBranchService.getAllBranchesWithEmployeeCount();
    }
}
