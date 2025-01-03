package ncc.java.opentalk.mapper;

import ncc.java.opentalk.dto.CompanyBranchDTO;
import ncc.java.opentalk.entity.CompanyBranch;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyBranchMapper {
    CompanyBranchMapper INSTANCE = Mappers.getMapper(CompanyBranchMapper.class);

    CompanyBranchDTO toDto(CompanyBranch companyBranch);

    CompanyBranch toEntity(CompanyBranchDTO companyBranchDTO);
}
